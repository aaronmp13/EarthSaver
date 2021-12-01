import React from 'react';
import * as ImagePicker from "expo-image-picker"
import { SectionList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, DatePickerIOSBase, SafeAreaView} from 'react-native';
import Firebase from '../firebase/config';
import * as firebase from "firebase";
import * as Font from 'expo-font';
import 'firebase/firestore';
import uuid from "uuid";
import {sessionStorage2} from '../../global.js';
import userDoc from './LoginScreen.js';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");
submissionRef = db.collection("submissions");


function refreshPage() {
  window.location.reload(false);
}

function getEmail(){
  let why = sessionStorage2.getItem("newUserEmail");

  return why
}

var emailTemp = getEmail();


if(userRef) {
  try{
      userRef.where("userEmail", "==", emailTemp).get().then(function(querySnapshot){
        querySnapshot.forEach(function(emailDoc){
          sessionStorage2.setItem("profileEmail", emailDoc.data().userEmail)
          sessionStorage2.setItem("profilePoints", emailDoc.data().userPoints)
          sessionStorage2.setItem("profileRank", emailDoc.data().userRank)
        })
      })
    }
  catch (error){
      console.log('error');
    }
}



var DATA = [
    {
      title: "My Points",
      data: [sessionStorage2.getItem("profilePoints")]
    },
    {
      title: "Tasks To Do",
      data: [sessionStorage2.getItem("userTasks")]
    },
  ];

  
const Item = ({ title }) => (
  <ScrollView style={styles.item}>
      <Text style={styles.title}>{title}</Text>
  </ScrollView>
);

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

class HomeScreen extends React.Component {


  state = {
    image: null,
    uploading: false,
  };

  refreshPage


  async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.getMediaLibraryPermissionsAsync();
    }
  }
  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }).then(alert("Image Library Access Failed"));

    console.log({ pickerResult });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        let currentTimestamp = new Date;
        let currentEmail = sessionStorage2.getItem("newUserEmail"); //complimentary component for retrieving the "user ID" from the login 
        console.log(currentEmail);
        submissionRef.doc(currentTimestamp.getTime().toString()).set({ 
          userEmail: currentEmail,
          userTimestamp: currentTimestamp,
          userImage: uploadUrl,
        })
        console.log("image upload success");
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
      const renderItem = ({ item }) => (
            <Item title={item.title} />
      );
      const handleSignOut = async () => {
        try {
          await auth.signOut();
        } catch (error) {
          console.log(error);
        }   
  };

      console.log(auth.DATA)
      let { image } = this.state;

      return (
        <SafeAreaView style={{flex: 1}}>
        
        <View style={styles.container}>
            {/*<SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
                )}
                />*/}
            <TouchableOpacity
            onPress={this._pickImage}
            title={'Upload Image'}
            style={styles.item}
            >
              <Text style={styles.submissionText}>Upload an Image</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
      );
    }
} 


export default HomeScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      //fontFamily: 'Raleway-Black',
    },
    item: {
        backgroundColor: 'dodgerblue',
        padding: 30,
        marginVertical: 10,
        marginHorizontal: 40,
        borderRadius: 10,
        shadowOpacity: 20,
        shadowColor: 'black',
        //fontFamily: "Roboto"
    },
    title: {
      fontSize: 25,
      color: 'white',
      //fontFamily: "Roboto",
    },
    submissionText: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center'
      //fontFamily: "Roboto",
    },
    header: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 0,
        //fontFamily: "Roboto"
    },
    submission: {
      fontSize: 30,
      color: 'white',
      marginVertical: 5,
      marginHorizontal: 15,
      textAlign: 'center',
    },
    backgroundFade: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      height:300
    }
  });
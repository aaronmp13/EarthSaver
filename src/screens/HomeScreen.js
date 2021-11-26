import React from 'react';
import * as ImagePicker from "expo-image-picker"
import { SectionList, ScrollView, StyleSheet, Text, View, Button, Image} from 'react-native';
import Firebase from '../firebase/config';
import * as firebase from "firebase";
import * as Font from 'expo-font';
import 'firebase/firestore';
import uuid from "uuid";

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");
submissionRef = db.collection("submissions");

async function email(doc) {
  return doc.data()
}

async function getCurrentTimestamp() {
  return Date.now()
}

const DATA = [
    {
      title: "My Points",
      data: globalUserDoc.get("userPoints")
    },
    {
      title: "Tasks To Do",
      data: globalUserDoc.get("userTasks")
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
        let currentTimestamp = getCurrentTimestamp();
        submissionRef.doc(currentTimestamp).set({ //creates doc for submission based on image link, time submitted, and the account correlated
          userEmail: globalUserDoc.data().userEmail,
          userTimestamp: currentTimestamp,
          userImage: pickerResult,
        })
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
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
                )}
            />
            <Button
            onPress={this._pickImage}
            title={'Upload Image'}
            style={styles.item}
            >
            </Button>
        </View>
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
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
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
    header: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 0,
        //fontFamily: "Roboto"
    },
  });
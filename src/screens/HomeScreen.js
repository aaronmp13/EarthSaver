import React from 'react';
import ImagePicker from "expo-image-picker"
import { SectionList, ScrollView, StyleSheet, Text, View, Button, Image,  } from 'react-native';
import Firebase from '../firebase/config';
import * as Font from 'expo-font';


const auth = Firebase.auth();




const DATA = [
    {
      title: "My Points",
      data: ["0"]
    },
    {
      title: "Tasks To Do",
      data: ["X", "X"]
    },
  ];
  
const Item = ({ title }) => (
  <ScrollView style={styles.item}>
      <Text style={styles.title}>{title}</Text>
  </ScrollView>
);

class HomeScreen extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.getMediaLibraryPermissionsAsync().then(alert("Sorry, we need camera roll permissions to make this work"));
      if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }
  _pickImage = async () => {
    let pickerResult = ImagePicker.launchImageLibraryAsync({
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
        const uploadUrl = uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
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
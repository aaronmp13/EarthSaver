import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View, Button, TextInput, UseContext} from 'react-native';
import Firebase from '../firebase/config';
import { useState } from 'react';
import '../../global.js';
import { Storage, sessionStorage2 } from '../../global.js';
import { useFonts, Inter_100Thin, Inter_200ExtraLight} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users")

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter_200ExtraLight',
    },
    text: {

    },

    inputs: {
      fontFamily: 'Inter_200ExtraLight',
      padding: 20,
      fontSize: 15,
    },
  });

  class userDoc{

    constructor(docEmail){
      this.docEmail = docEmail;
    }

    get docEmail(){
      return this.docEmail;
    }

    checkIfExisting(email){
      return new Promise((resolve, reject) => {
      userRef.where('userEmail', "==", email).get().then(function(querySnapshot){
        querySnapshot.forEach(function(emailDoc){
          let emailReturn = emailDoc.data().userEmail;
          this.docEmail = emailReturn;
          resolve(emailReturn);
        })
      })
     });
    }
  }

let userDocEmail = new userDoc();

  function LoginScreen({navigation}) {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
  
    const onLogin = async () => {
      try {
        if (email !== '' && password !== '') {
          await auth.signInWithEmailAndPassword(email, password);
          var actualEmailWhat = await userDocEmail.checkIfExisting(email);
          console.log(actualEmailWhat)
          sessionStorage2.setItem("newUserEmail", actualEmailWhat); //system to store the "user ID" for the current session
          navigation.navigate('Main')
        }
      } catch (error) {
        console.log("invalid")
        //setLoginError(error.message);
      }
    };
  
    const toSignUp = async () => {
      navigation.navigate('SignUp')
    };
    

    let [fontsLoaded] = useFonts({
      Inter_100Thin,
      Inter_200ExtraLight,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {

      return (
        <View style={styles.container}>
          <Text style={{fontFamily: 'Inter_100Thin', fontSize: 40, padding: 20}}>Enter Credentials</Text>
          <TextInput style={styles.inputs} placeholder="Email" keyboardType="email-address" onChangeText={onChangeEmail}/>
          <TextInput style={styles.inputs} placeholder="Password" keyboardType="visible-password" onChangeText={onChangePassword}/>
  
        <TouchableOpacity style={{borderRadius: 5, padding: 7, width: 200, backgroundColor:'#83bbf2', alignItems: 'center'}} onPress={onLogin}>
          <Text style={{color: '#ffff'}}>L O G I N</Text>
        </TouchableOpacity>
  
        <Text style={{fontFamily: 'Inter_200ExtraLight', marginTop: 20}}>Don't have an account?</Text>
  
        <TouchableOpacity onPress={toSignUp}>
          <Text style={{fontFamily: 'Inter_200ExtraLight', color: '#83bbf2'}}>Sign Up</Text>
        </TouchableOpacity>
  
        </View>
      );
    }
  }
  
  export default LoginScreen;
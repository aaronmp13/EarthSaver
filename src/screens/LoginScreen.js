import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Firebase from '../firebase/config';
import { useState } from 'react';

const auth = Firebase.auth();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Raleway-Black',
    },
  });

function LoginScreen({navigation}) {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        console.log("hit")
        await auth.signInWithEmailAndPassword(email, password);
        navigation.navigate('Home')
      }
    } catch (error) {
      console.log("invalid")
      //setLoginError(error.message);
    }
  };

  const toSignUp = async () => {
    navigation.navigate('SignUp')
  };
  
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, padding: 20}}>Enter Credentials</Text>
        <TextInput style={{padding: 5}} placeholder="Email" keyboardType="email-address" onChangeText={onChangeEmail}/>
        <TextInput style={{padding: 20}} placeholder="Password" keyboardType="visible-password" onChangeText={onChangePassword}/>

      <TouchableOpacity style={{borderRadius: 5, padding: 7, width: 200, backgroundColor:'dodgerblue', alignItems: 'center'}} onPress={onLogin}>
        <Text style={{color: '#ffff'}}>L O G I N</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 20}}>Don't have an account?</Text>

      <TouchableOpacity onPress={toSignUp}>
        <Text style={{color: 'dodgerblue'}}>Sign Up</Text>
      </TouchableOpacity>

      </View>
    );
}

export default LoginScreen;
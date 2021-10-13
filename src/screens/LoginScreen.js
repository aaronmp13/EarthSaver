import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Firebase from '../firebase/config';
import { useState } from 'react';

const auth = Firebase.auth();

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
        <Text>Login</Text>
        <TextInput placeholder="email@email.com" keyboardType="password" onChangeText={onChangeEmail}/>
      <TextInput placeholder="password" keyboardType="password" onChangeText={onChangePassword}/>
        <Button
        onPress={onLogin}
        backgroundColor='#f57c00'
        title='Login'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
          <Button
        onPress={toSignUp}
        backgroundColor='#f57c00'
        title='Create an Account'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      </View>
    );
}

export default LoginScreen;
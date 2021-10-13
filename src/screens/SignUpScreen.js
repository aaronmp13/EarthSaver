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

function SignUpScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

  const onSignup = async () => {
    try {
      if (email !== '' && password !== '') {
          console.log("signup")
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const toLogin = async () => {
    navigation.navigate('Login')
  };
  
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {signupError ? <Text>{signupError}</Text> : null}
        <TextInput placeholder="email@email.com" keyboardType="password" onChangeText={setEmail}/>
      <TextInput placeholder="password" keyboardType="password" onChangeText={setPassword}/>
        <Button
        onPress={onSignup}
        backgroundColor='#f57c00'
        title='Create Account'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
          <Button
        onPress={toLogin}
        backgroundColor='#f57c00'
        title='Sign in'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      </View>
    );
}

export default SignUpScreen;
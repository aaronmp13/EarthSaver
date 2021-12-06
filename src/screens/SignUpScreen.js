import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Firebase from '../firebase/config';
import { useState } from 'react';
import 'firebase/firestore';
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
        userRef.doc(email).set({
          userEmail: email,
          userPoints: 0,
          userRank: 0,
          userTasks: [],
          userUsername: "",
        })
        let dataTest = userRef.doc(email).get();
      }
      setSignupError('Account Created!');
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const toLogin = async () => {
    navigation.navigate('Login')
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
        
      
      
        <Text style={{fontFamily: 'Inter_100Thin', fontSize: 40, padding: 20,}}>Create Credentials</Text>
        {signupError ? <Text>{signupError}</Text> : null}
        <TextInput style={{fontFamily: 'Inter_200ExtraLight', padding: 5}} placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
        <TextInput style={{fontFamily: 'Inter_200ExtraLight', padding: 20}} placeholder="Password" keyboardType="visible-password" onChangeText={setPassword}/>


      <View style={{}}>
        
      <TouchableOpacity style={{borderRadius: 5, padding: 7, width: 200, backgroundColor:'#83bbf2', alignItems: 'center'}} onPress={onSignup}>
        <Text style={{color: '#ffff'}}>S I G N  U P</Text>
      </TouchableOpacity>
      </View>
        
        {/* <Button
        onPress={toLogin}
        backgroundColor='#f57c00'
        title='Sign in'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
        /> */}

      </View>
    );
  }
}

export default SignUpScreen;


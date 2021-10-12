import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import { AuthenticatedUserContext } from '../firebase/AuthenticatedUserProvider';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default function HomeScreen() {
    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View style={styles.container}>
        <StatusBar style='dark-content' />
        <View style={styles.row}>
          <Text style={styles.title}>Welcome {user.email}!</Text>
        </View>
        <Text style={styles.text}>Your UID is: {user.uid} </Text>
      </View>
    );
  }
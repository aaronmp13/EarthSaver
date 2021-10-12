import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default function HomeScreen() {
    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Welcome !</Text>
        </View>
        <Text style={styles.text}>Your UID is:s </Text>
      </View>
    );
  }
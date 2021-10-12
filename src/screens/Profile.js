import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profile: {

    }

  });

  export default function Profile() {
    return (
      <View style={styles.container}>
        <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.title}>{user}</Text>
        </View>
        <Text style={styles.text}></Text>
      </View>
    );
  }
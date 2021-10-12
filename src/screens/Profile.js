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

  },
  profileText: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    color: "#000"
  },
  settingsText: {
    fontSize: 12,
    color: "#000"
  },
  rankText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000"
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bolb",
    color: "#808080"
  },
});

  export default function Profile() {
    return (
      <View style={styles.container}>
        <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.profileText}>{user}</Text>
        </View>
        <Text style={styles.text}></Text>
      </View>
    );
  }
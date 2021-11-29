import React, { useReducer } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { sessionStorage2 } from '../../global.js';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");

  function Profile ({navigation}){

    async function getDetail (detail){
      userRef.doc(sessionStorage2.getItem("newUserEmail")).data().detail
    }
    profileUsername = getDetail(username)//globalUserDoc.get("userUsername");
    profileEmail = getDetail(email)//globalUserDoc.get("userEmail");
    profilePoints = getDetail(points)//globalUserDoc.get("userPoints");
    profileRank = getDetail(rank)//gloablUserDoc.get("userRank");

    return (
    <View style={styles.container}>
      <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.profileText}>{profileUsername}</Text> 
        </View>
    <Text style={styles.rankText}>{profileRank}</Text>
    <Text style={styles.rankSubText}>"with"</Text>
    <Text style={styles.rankText}>{profilePoints}</Text>
    <Text style={styles.rankSubText}>"points!"</Text>
    <Text style={styles.settingsText}></Text>
    </View>
    );
  }

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
      fontWeight: "bold",
      color: "#808080"
    },
  });
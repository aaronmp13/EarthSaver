import React, { useReducer } from 'react';
import { RecyclerViewBackedScrollViewBase, StatusBar, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { sessionStorage2 } from '../../global.js';
import './rankQuery.js'
import rankQuery from './rankQuery.js';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");

function getEmail(){
  let why = sessionStorage2.getItem("newUserEmail");
  return why
}

  function Profile ({navigation}){
    var emailTemp = getEmail()
    console.log(emailTemp)
    let ranks = new rankQuery;
    ranks.getRankQuery(userRef)
    userRef.where("userEmail", "==", emailTemp).get().then(function(querySnapshot){
      querySnapshot.forEach(function(emailDoc){
        sessionStorage2.setItem("profileEmail", emailDoc.data().userEmail)
        sessionStorage2.setItem("profilePoints", emailDoc.data().userPoints)
        sessionStorage2.setItem("profileRank", emailDoc.data().userRank)
      })
    })
    var profileEmail = sessionStorage2.getItem("profileEmail");
    var profilePoints = sessionStorage2.getItem("profilePoints");
    var profileRank = sessionStorage2.getItem("profileRank");
    console.log('variables')
    console.log(profileEmail)
    console.log(profilePoints)

    return (
    <View style={styles.container}>
      <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.profileText}>{profileEmail}</Text> 
        </View>
    <Text style={styles.labelText}>{"You are ranked:"}</Text>
    <Text style={styles.rankText}>{profileRank}</Text>
    <Text style={styles.labelText}>{"with"}</Text>
    <Text style={styles.rankText}>{profilePoints}</Text>
    <Text style={styles.labelText}>{"points!"}</Text>
    <Text style={styles.settingsText}></Text>
    </View>
    );
  }
export default Profile;

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
      fontSize: 32,
      fontWeight: "bold",
      alignItems: "center",
      color: "#000"
    },
    settingsText: {
      fontSize: 12,
      color: "#000"
    },
    rankText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#000"
    },
    labelText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#808080"
    },
  });
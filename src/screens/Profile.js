import React, { useReducer } from 'react';
import { RecyclerViewBackedScrollViewBase, StatusBar, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { sessionStorage2 } from '../../global.js';
import { render } from 'react-dom';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");

function getEmail(){
  let why = sessionStorage2.getItem("newUserEmail");
  return why
}

  function Profile ({navigation}){
    var profileEmail;
    var profilePoints;
    var emailTemp = getEmail()
    console.log(emailTemp)
    userRef.where("userEmail", "==", emailTemp).get().then(function(querySnapshot){
      querySnapshot.forEach(function(emailDoc){
        sessionStorage2.setItem("profileEmail", emailDoc.data().userEmail)
        sessionStoreage2.setItem("profilePoints", emailDoc.data().userPoints)
      //let profileDoc = emailDoc;
      //profileEmail = profileDoc.data().userEmail
      //profilePoints = profileDoc.data().userPoints
      //profileRank = profileDoc.data().userTasks
      })
    })
    profileEmail = sessionStorage2.getItem("profileEmail");
    profilePoints = sessionStorage2.getItem("profilePoints")

    return (
    <View style={styles.container}>
      <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.profileText}>{profileEmail}</Text> 
        </View>
    <Text style={styles.rankText}>{"What"}</Text>
    <Text style={styles.rankText}>{profilePoints}</Text>
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
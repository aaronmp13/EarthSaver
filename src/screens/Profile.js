import React, { useState, useReducer, useEffect } from 'react';
import { RecyclerViewBackedScrollViewBase, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_400Regular} from '@expo-google-fonts/inter';
import { sessionStorage2 } from '../../global.js';
import './rankQuery.js'
import rankQuery from './rankQuery.js';
import AppLoading from 'expo-app-loading';


const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");

function getEmail(){
  let why = sessionStorage2.getItem("newUserEmail");
  return why
}

  function Profile ({navigation}){

    const [rank,setrank]=useState(null);
    const [points, setpoints]=useState(null);
    const [email, setmail]=useState(null);

    var emailTemp = getEmail()
    let ranks = new rankQuery;
    ranks.getRankQuery(userRef)
    
    
    useEffect( () => {
      userRef.where("userEmail", "==", emailTemp).get().then(function(querySnapshot){
        querySnapshot.forEach(function(emailDoc){
          sessionStorage2.setItem("profileEmail", emailDoc.data().userEmail)
          sessionStorage2.setItem("profilePoints", emailDoc.data().userPoints)
          sessionStorage2.setItem("profileRank", emailDoc.data().userRank)
          setmail(emailDoc.data().userEmail);
          setrank(emailDoc.data().userRank);
          setpoints(emailDoc.data().userPoints);
        })
      })
    })

    let [fontsLoaded] = useFonts({
      Inter_100Thin,
      Inter_200ExtraLight,
      Inter_400Regular,
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
  
    return (
    <View style={styles.container}>
      <StatusBar style='light-content' />
        <View style={styles.profile}>
          <Text style={styles.profileText}>{email}</Text> 
        
          <Text style={styles.labelText}>{"Rank:"} {rank}</Text>
          <Text style={styles.labelText}>Points: {points}</Text>
          <Text style={styles.settingsText}></Text>
        </View>

    <Text style={styles.title}>How to Earn Points:</Text>
    <Text style={styles.text}>
      When you submit an activity to the EarthSaver app, you can earn points for your account. These points
        will be given out after validation by a member of the team. Specific point values are set for certain activities, but events that
        have a greater impact on the environment generally are worth more.
    </Text>

    <Text style={styles.title}>Tasks:</Text>

    <Text style={styles.text}>Planting Tree - 100 Points</Text>
    <Text style={styles.text}>Recycling - 5 Points</Text>
    <Text style={styles.text}>Use of Renewable Energy - 10 Points</Text>
    <Text style={styles.text}>Trash Pickup - 20 Points</Text>


    </View>
    );
    }
  }
export default Profile;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title:{
      fontFamily: 'Inter_100Thin',
      fontSize: 20,
      marginTop: 15,
    },

    text:{
      fontFamily: 'Inter_200ExtraLight',
      marginHorizontal: 10,
      marginTop: 5,
    },

    profile: {
      backgroundColor: "#83bbf2",
      borderRadius: 20,
      shadowColor: 'gray',
      shadowOpacity: 10,
    },
    profileText: {
      fontSize: 32,
      fontWeight: "bold",
      alignItems: "center",
      color: "white",
      fontFamily: 'Inter_400Regular',
      margin: 10,
    },
    settingsText: {
      fontSize: 12,
      color: "#000",
    },
    rankText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#000",
      fontFamily: 'Inter_400Regular',
    },
    labelText: {
      fontFamily: 'Inter_200ExtraLight',
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      margin: 5,
    },
  });
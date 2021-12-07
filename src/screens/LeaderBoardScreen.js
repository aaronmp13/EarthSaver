import React, { useState,useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text, StatusBar, ScrollView } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import {sessionStorage2} from '../../global.js';
import './LoginScreen.js';
import Leaderboard from 'react-native-leaderboard';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_100Thin, Inter_200ExtraLight} from '@expo-google-fonts/inter';
import favIcon  from '../favicon.png';



const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users")

const styles = StyleSheet.create({
    header: {
      flex: .5, 
      backgroundColor: '#83bbf2',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },

    headerText: {
      fontFamily: 'Inter_200ExtraLight',
      fontSize: 30,
      margin: 20,
    },

    container: {
      flex: 1,
      fontFamily: 'Inter_200ExtraLight',
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#85efff',
      padding: 20,
      marginVertical: 3,
      marginHorizontal: 16,
      borderRadius: 5,
      alignContent: 'center',
    },
    title: {
      fontSize: 20,
      justifyContent: 'center',
    },
  });

function getEmail(){
  let why = sessionStorage2.getItem("newUserEmail");
  return why
}

let emailTemp = getEmail();


function LeaderBoardScreen(){

  
  const num_suffix = (num) => {
      let j = num % 10,
          k = num % 100;
      if (j == 1 && k != 11) {
          return num + "st";
      }
      if (j == 2 && k != 12) {
          return num + "nd";
      }
      if (j == 3 && k != 13) {
          return num + "rd";
      }
      return num + "th";
  }


  const [users,setUsers]=useState([]);  
  const [rank,setrank]=useState(null);
  const [points, setpoints]=useState(null);

  useEffect( () => {

    let i = 0
    userRef.orderBy('userPoints', 'desc').onSnapshot(querySnapshot => {

    const docContainer = [];

        querySnapshot.forEach(document => {
          docContainer.push( document.data() );
          i = i + 1
        })
        setUsers(docContainer);
    })

    userRef.where("userEmail", "==", emailTemp).get().then(function(querySnapshot){
      querySnapshot.forEach(function(emailDoc){
        setrank(emailDoc.data().userRank);
        setpoints(emailDoc.data().userPoints);
      })
    }).then(function() {
      if (rank == 0){
        setrank(i)
      }
    })

    

  })

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
  });

  const props = {
      data:{users},
      sortBy:'userPoints',
      labelBy:'userEmail',
  }

  let emailTemp = getEmail();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    <View style={styles.container}>

      <View style={styles.header}>  

        <Text style={styles.headerText}> {num_suffix(rank)} </Text>

        <Image style={{ aspectRatio: 1, }} source={favIcon}/> 

        <Text style={styles.headerText}> {points}pts</Text>
      </View>
      
      <Leaderboard 
          data={users}
          sortBy='userPoints'
          labelBy='userEmail'
      />
    </View>
  )
  }
}
        

  export default LeaderBoardScreen;
import React, { useState,useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import {sessionStorage2} from '../../global.js';
import './LoginScreen.js';


const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users")
var leaderboard = [];

const styles = StyleSheet.create({
    container: {
      flex: 1,
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

const Item = ({ title }) => (
  <ScrollView style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </ScrollView>
);


function LeaderBoardScreen(){
  const [users,setUsers]=useState(null)
  
  useEffect( () => {
    userRef.orderBy('userPoints', 'desc').onSnapshot(querySnapshot => {

    const docContainer = [];
    let i = 1;

        querySnapshot.forEach(document => {
          docContainer.push(i + ". " + document.get('userEmail'));
          i = i+1;
        })
        setUsers(docContainer);
    })
  })

  const renderItem = ({ item }) => (
    <Item title={item} />
  );


  return (
    <View style={styles.container}>
      <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={ (item, index ) => (
                  index.toString()
              )}
              />
    </View>
  )
}
        

  export default LeaderBoardScreen;
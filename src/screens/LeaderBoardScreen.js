import React from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, ScrollView } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import {sessionStorage2} from '../../global.js';
import './LoginScreen.js';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users")

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#dfede0',
      padding: 10,
      marginVertical: 1,
      marginHorizontal: 16,
      borderRadius: 5,
      alignContent: 'center',
    },
    title: {
      fontSize: 15,
      justifyContent: 'center',
    },
  });

async function sortDocs (doc) {
  let docContainer = [];
  let docRanks = doc.orderBy('userPoints', 'desc').limit(5).get().then(querySnapshot => {
    querySnapshot.forEach(document =>{
      docContainer[document] = document.data();
    })
  }) //gets the top 10 users based on points 
  return docContainer
}
  
const DATA = [
  {
    id: 'sortDocs(userRef)',
    title: '1st',
    data: '3'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '2nd',
    data: '5'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '3rd',
    data: '5'
  },
];

const Item = ({ title }) => (
  <ScrollView style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </ScrollView>
);

class LeaderBoardScreen extends React.Component {
    render() {
        const renderItem = ({ item }) => (
            <Item title={item.title} />
            
          );
          //const enumDocs = () => {
          //  let what = sortDocs(userRef);
          //  for(let i = 0; i<what.length(); i++){
          //    sessionStorage2.setItem("newUserEmail", actualEmailWhat)
          //  }
          //}
          return (
            <View style={styles.container}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          );
        }
    }
        

  export default LeaderBoardScreen;
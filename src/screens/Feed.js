import React from 'react';
import { SectionList, FlatList, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from '../firebase/config';
import * as firebase from "firebase";
import 'firebase/firestore';
import '../../global.js';
import {sessionStorage2} from '../../global.js';
import './LoginScreen.js';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },

    item: {
        backgroundColor: '#c8c2ff',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },

    title: {
      fontSize: 25,
    },
    header: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 0,
    },
  });

  const auth = Firebase.auth();
  const db = Firebase.firestore();
  userRef = db.collection("users");
  submissionRef = db.collection("submissions");

const DATA = [];
  
  const Item = ({ title }) => (
    <ScrollView style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </ScrollView>
  );
  
  class Feed extends React.Component {
    render() {
        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );
        const getFeed = ({num}) => {
          let newData
          feedQuery = submissionRef.orderBy('userTimestamp').limit(num).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
              newData.push({title: doc.data().userEmail, item: doc.data().userTimestamp})
              console.log(doc.data().userEmail)
            })
          });
          return newData;
        }
        let newWhat = getFeed(5)
      return (
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
      );
    }
  }
  export default Feed;

  //get the (5) latest submission docs by timestamp 
  //display them in DATA items
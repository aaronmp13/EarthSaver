import React, { useState, useReducer, useEffect } from 'react';
import { RecyclerViewBackedScrollViewBase, Image, ScrollView, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { sessionStorage2 } from '../../global.js';
import './rankQuery.js'
import rankQuery from './rankQuery.js';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");
submissionRef = db.collection("submissions");


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#85efff',
      padding: 20,
      marginVertical: 20,
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
  

function getEmail(){
    let why = sessionStorage2.getItem("newUserEmail");
  
    return why
  }

function Home () {

    var emailTemp = getEmail()

    const [emails, setmails]=useState(null);
    const [images,setImage]=useState(null);
    const [date, setDate]=useState(null);




    useEffect( () =>{

        submissionRef.onSnapshot(querySnapshot => {

            const docContainer = [];

            
            querySnapshot.forEach(document => {
                docContainer.push( [document.get('userImage'), document.get('userEmail'), document.get('userTimestamp')] );
            })
            setImage(docContainer);

        })

    })

    return (
        
        <View style={styles.container}>
            <FlatList
                    data={ images }

                    keyExtractor={ (item, index ) => (
                        index.toString()
                    )}


                    renderItem={ ({ item, index }) => (

                        <View style={{justifyContent: 'center', alignItems: 'center',}}>
                            <Text> {item[1]} </Text>

                            <Image source={{uri: item[0]}} /* Use item to set the image source */

                            key={index} /* Important to set a key for list items,
                                            but it's wrong to use indexes as keys, see below */
                            style={{
                                width: '100%',
                                borderRadius: 10,
                                aspectRatio: 1,
                            }}
                            />

                            <Text> {item[2].toDate().toString()} </Text>
                        </View>

                        
                    )}
            />
            
        </View>
    )
}

export default Home;
import React, { useState, useReducer, useEffect } from 'react';
import { RecyclerViewBackedScrollViewBase, Image, ScrollView, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';
import 'firebase/firestore';
import '../../global.js';
import { sessionStorage2 } from '../../global.js';
import './rankQuery.js'
import rankQuery from './rankQuery.js';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_100Thin, Inter_200ExtraLight} from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';



const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users");
submissionRef = db.collection("submissions");


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        // alignItems: 'center', 
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
    item: {
    //   backgroundColor: '#85efff',
    //   padding: 20,
      marginVertical: 20,
      borderRadius: 5,
      alignContent: 'center',
      fontFamily: 'Inter_100Thin',
      marginHorizontal: 5,

    },
    title: {
      fontSize: 20,
      marginHorizontal: 5,
      justifyContent: 'flex-start',
      fontFamily: 'Inter_200ExtraLight',
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

        submissionRef.orderBy('userTimestamp', 'desc').onSnapshot(querySnapshot => {

            const docContainer = [];

            
            querySnapshot.forEach(document => {
                docContainer.push( [document.get('userImage'), document.get('userEmail'), document.get('userTimestamp')] );
            })
            setImage(docContainer);

        })

    })

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {

    return (
        
        <View style={styles.container}>

            {/* <LinearGradient
                // Background Linear Gradient
                colors={['transparent', '#F2F2F2']}
                useAngle={true} 
                start={{ x: 0.1, y: 0.2 }}
                angle={45} 
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={styles.background}
            />
             */}
            <FlatList
                    data={ images }

                    keyExtractor={ (item, index ) => (
                        index.toString()
                    )}
                    
                    maxToRenderPerBatch={5}

                    renderItem={ ({ item, index }) => (

                        <View style={styles.item}>
                            <Text style={styles.title}> {item[1]} </Text>

                            <Image source={{uri: item[0]}} /* Use item to set the image source */

                            key={index} /* Important to set a key for list items,
                                            but it's wrong to use indexes as keys, see below */
                            style={{
                                width: '98%',
                                borderRadius: 20,
                                aspectRatio: 1,
                                margin:3,
                                
                            }}
                            />

                            <Text style={{
                                marginVertical: 5, 
                                alignContent: 'center', 
                                fontFamily: 'Inter_100Thin', 
                                marginHorizontal: 5,
                                
                                }}> {item[2].toDate().toString()} </Text>

                            
                        </View>

                        
                    )}
            />
            
        </View>
    )
                        }
}

export default Home;
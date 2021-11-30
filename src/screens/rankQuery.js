import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Firebase from '../firebase/config';
import { useState } from 'react';
import 'firebase/firestore';
import { Ref } from 'react';

const auth = Firebase.auth();
const db = Firebase.firestore();
userRef = db.collection("users")

class rankQuery{

    getRankQuery(col){
        var i = 0;
        col.orderBy('userPoints', 'desc').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                console.log('Query Data');
                let temp = doc.data();
                console.log(temp);
                i += 1;
                let tempRank = i;
                console.log(tempRank);
                console.log(temp.userEmail)
                userRef.doc(temp.userEmail).update({
                    userRank: tempRank
                })
            })
        })
    }



    getCurrentRank(col, email){
        var emailReturn;
        col.where('userEmail', '==', email).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                emailReturn = doc.data().userEmail;
            })
        })
        return emailReturn;
    }
}
export default rankQuery
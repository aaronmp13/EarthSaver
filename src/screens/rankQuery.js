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

    getRankQuery(col, num){
        var i = 1;
        col.orderBy('userPoints', 'desc').limit(num).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                const temp = doc.data();
                tempRank = temp.userRank+1;
                temp.ref.update(tempRank)
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
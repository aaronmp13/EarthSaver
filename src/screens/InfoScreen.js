import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Firebase from '../firebase/config';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Raleway-Black'
    },
  });

class InfoScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar style='dark-content' />
        <View style={styles.row}>
          <Text style={styles.title}>How to Earn Points:</Text>
        </View>
        <Text style={styles.text}> When you submit an activity to the EarthSaver app, you can earn points for your account. These points
        will be given out after validation by a member of the team. Specific point values are set for certain activities, but events that
        have a greater impact on the environment generally are worth more.</Text>
      </View>
    );
  }
}

export default InfoScreen;
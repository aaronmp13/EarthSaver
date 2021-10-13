import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 30,
    },
  });

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <View style={{flex: 2}}>
        </View>

        <View style={{flex: 0.5}}>
          <Text style={{fontSize: 50, alignItems: 'center'}}>Earth Saver</Text>
        </View>

        <View style={{flex: 0.5}}>
          <Text>saving the earth one task at a time</Text>
        </View>

        <View style={{flex: 2,}}>

          <TouchableOpacity style={{borderRadius: 5, padding: 7, width: 100, backgroundColor:'dodgerblue', alignItems: 'center'}} onPress={()=>this.props.navigation.navigate('Login')}>
            <Text style={{color: 'white'}}>L O G I N</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}


export default Welcome;
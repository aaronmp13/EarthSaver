import React from 'react';
import { StyleSheet, Image, Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts, Inter_100Thin, Inter_200ExtraLight} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';



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


function Welcome ({navigation}) {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={styles.container}>

        
        <View style={{flex: 2}}>
        </View>

        <View style={{flex: 0.5}}>
          <Text style={{fontFamily: 'Inter_100Thin', fontSize: 40, alignItems: 'center'}}>Earth Saver</Text>
        </View>

        <View style={{flex: 0.5}}>
          <Text style={{fontFamily: 'Inter_200ExtraLight',}}>saving the earth one task at a time</Text>
        </View>

        <View style={{flex: 2,}}>

          <TouchableOpacity style={{borderRadius: 5, padding: 7, width: 160, backgroundColor:'dodgerblue', alignItems: 'center'}} onPress={()=>navigation.navigate('Login')}>
            <Text style={{fontFamily: 'Inter_200ExtraLight', color: 'white'}}>E N T E R</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

export default Welcome;
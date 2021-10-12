import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import { Provider } from 'react-redux';
import store from   './src/store'


const Stack = createNativeStackNavigator(); 

const App = () => {
   // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
 
   // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
 
   useEffect(() => {
     //const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     //return subscriber; // unsubscribe on unmount
   }, []);
   
  return (
    <Provider store={store}>
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Please Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;


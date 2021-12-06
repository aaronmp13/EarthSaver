import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createSwitchNavigator } from "react-navigation";
import './global.js'
import HomeScreen from './src/screens/HomeScreen'
import Home from './src/screens/Home'
import InfoScreen from './src/screens/InfoScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from  './src/screens/SignUpScreen'
import LeaderBoardScreen from  './src/screens/LeaderBoardScreen'
import Welcome from './src/screens/Welcome'
import Profile from './src/screens/Profile'
import { Provider } from 'react-redux';
import store from './src/store'
import { Ionicons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

  const StackNav = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Sign Up' }}
          />
          <Stack.Screen
            name="Main"
            component={TabNav}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>

    );
  }



  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav/>
      </NavigationContainer>
    </Provider>
  );
};

const TabNav = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen 
      name="Feed" 
      component={Home} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Leaderboard" 
      component={LeaderBoardScreen} 
      options={{
        tabBarLabel: 'Leaderboard',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="podium" color={color} size={size} />
        ),
      }}/>

      <Tab.Screen 
      name="Upload" 
      component={HomeScreen} 
      options={{
        tabBarLabel: 'Upload',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="aperture" color={color} size={size} />
        ),
      }}/>
      
      <Tab.Screen 
      name="Profile Statistics" 
      component={Profile} 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
      }}
      />

      {/* <Tab.Screen 
      name="Information" 
      component={InfoScreen}
      options={{
        tabBarLabel: 'Info',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="help" color={color} size={size} />
        ),
      }} /> */}
    </Tab.Navigator>
  );
}

export default App;


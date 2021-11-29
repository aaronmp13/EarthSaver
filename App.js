import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createSwitchNavigator } from "react-navigation";
import './global.js'
import HomeScreen from './src/screens/HomeScreen'
import InfoScreen from './src/screens/InfoScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from  './src/screens/SignUpScreen'
import LeaderBoardScreen from  './src/screens/LeaderBoardScreen'
import Welcome from './src/screens/Welcome'
import Profile from './src/screens/Profile'
import Feed from './src/screens/Feed'
import { Provider } from 'react-redux';
import store from './src/store'

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
            name="Home"
            component={TabNav}
            options={{ title: 'Earth Saver' }}
          />
          <Stack.Screen
            name="Feed"
            component={Feed}
            options={{ title: 'Feed' }}
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
      <Tab.Screen name="Home Page" component={HomeScreen} />
      {/* <Tab.Screen name="Feed" component={Feed} /> */}
      <Tab.Screen name="Leaderboards" component={LeaderBoardScreen} />
      {/* <Tab.Screen name="Profile" component={Profile}/> */}
      <Tab.Screen name="Info" component={InfoScreen} />
      {/* <Tab.Screen name="Profile" component={Profile}/> */}
      <Tab.Screen name="Feed" component={Feed} />
    </Tab.Navigator>
  );
}

export default App;


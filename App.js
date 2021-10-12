import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'

const Stack = createNativeStackNavigator(); 

const App = () => {
  return (
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
  );
};

export default App;


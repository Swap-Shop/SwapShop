import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import Welcome_Page from '../screens/Welcome_Page'
import Navigation from '../screens/Navigation';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <View style={style.container}>
    //   <LoginScreen/>
    // </View>

    <NavigationContainer
    >

    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
    }}
   >
          <Stack.Screen name="Welcome" component={Welcome_Page}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Navigate" component={Navigation}/>
         
        
      
    </Stack.Navigator>
  </NavigationContainer>
  );
};



export default App;
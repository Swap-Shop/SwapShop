import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import Welcome_Page from '../screens/Welcome_Page'
import Navigation from '../screens/Navigation';
import Password from '../screens/forgot_password';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={Welcome_Page}/>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Navigate" component={Navigation}/>
          <Stack.Screen name="password" component={Password}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};



export default App;
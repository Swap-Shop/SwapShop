import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

const App = () => {
  return (
    <View style={style.container}>
      <LoginScreen/>
    </View>
  );
};

const style = StyleSheet.create({
})

export default App;
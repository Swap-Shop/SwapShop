import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

const App = () => {
  return (
    <View style={style.container}>
      <Image style={style.logo} source={require('./image.png')}/>
      <Text>Welcome to SwapShop</Text>
      <Text style={{paddingTop: 10, paddingBottom: 10}}>To register, please enter an email address and a password.</Text>
      <TextInput style={style.input} placeholder='Enter email address'/>
      <TextInput style={style.input} secureTextEntry={true} placeholder='Enter password' />
      <View style={{flexDirection:'row'}}>
      <Button style={{padding: 50}} title='Register'/>
      <Button title='Login'/>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '515052'
  },
  input: {
    height: 48,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button:{
    borderWidth: 1,
    height: 48,
    width: 24,
  },
  logo:{
    width: 375,
    height: 100, 
    paddingBottom: 32
  }
})

export default App;
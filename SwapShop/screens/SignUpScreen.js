import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    useState,
    TextInput
  } from 'react-native';


const SignUpScreen = ({navigation}) => {

  return (
    <View style={style.container}>
      <Text style = {style.heading} > Sign Up </Text>

      <TextInput placeholder='Enter Username' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      
      />

      <TextInput placeholder='Enter Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      />

      <TextInput placeholder='Confrim Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      />
      <TouchableOpacity style = {style.button} onPress = {() => navigation.navigate('Login')}>
        <Text style = {style.text}> Sign Up </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '515052'
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    width:250,
    top:70,
    margin:20,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf:'center',
    top:100,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#2596be',
  },
  heading:{
    width: 375,
    height: 100, 
    top:30,
    fontSize: 60,
    fontStyle:'italic',
    fontWeight:'bold',
    color: '#2596be',
    marginLeft: 135
  },
  text: { 
    color: 'black',
    fontSize: 25,
  },
})

export default SignUpScreen;
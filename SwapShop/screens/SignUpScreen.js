import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    TextInput
  } from 'react-native';
  import auth from '@react-native-firebase/auth';
  import { useNavigation } from '@react-navigation/native';


  const SignUpFunction = (username, password) => {

    auth()
    .createUserWithEmailAndPassword(username.trim(), password.trim())
    .then(() => {
      console.log('User account created');
      alert ('Success!, you have created an account')
      navigation.navigate('Navigate')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        alert ('That email address is already in use!')
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        alert ('That email address is invalid!')
      }
  
      console.error(error);
    });
  }

  const checkSignUp = (username, password, ConfirmPassword) =>{
    if(!username.trim() || !password.trim() || !ConfirmPassword.trim()){
      alert("Please enter all the fields")
    }
    if(password.length < 6){
      alert("Password should be 6 or more characters")
    }
    if(password.trim() != ConfirmPassword.trim()){
      alert("Passwords do not match")
    }
    else{
        SignUpFunction(username, password)
    }

  }

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={style.container}>
      <Text style = {style.heading} > Sign Up </Text>

      <TextInput placeholder='Enter Username' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      value = {username}
      onChangeText = {text => setUsername(text)}
      />

      <TextInput placeholder='Enter Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      value = {password}
      onChangeText = {value => setPassword(value)}
      />

      <TextInput placeholder='Confrim Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      value = {ConfirmPassword}
      onChangeText = {value => setConfirmPassword(value)}
      />
      <TouchableOpacity style = {style.button} onPress = {() => checkSignUp(username, password, ConfirmPassword)}>
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
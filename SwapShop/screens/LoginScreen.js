import { placeholder } from '@babel/types';
import React, { useState, useEffect, useCallback } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
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


  
const LoginScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const LoginFunction = () => {

      auth()
      .signInWithEmailAndPassword(username.trim(), password.trim())
      .then(() => {
        console.log('Sign Successful');
        navigation.navigate('Navigate')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert("That email address is already in use!")
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert("That email address is invalid!")
        }
    
        console.error(error);
      });
    }

    const checkLogin = () =>{
      if(!username.trim() || !password.trim()){
        alert("Please enter all the fields")
      }
      if(password.length < 6){
        alert("Password should be 6 or more characters")
      }
      else{
          LoginFunction()
      }

    }

  return (
    <View style={style.container}>
      <Image style={style.logo} source={require('../assests/Images/image.png')}/>

      <TextInput placeholder='Username' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      value = {username}
      onChangeText = {value => setUsername(value)}
      />

      <TextInput placeholder='Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      value = {password}
      onChangeText = {value => setPassword(value)}
      />

      <TouchableOpacity onPress = {() => alert("Password forgotten")}>
      <Text style = {style.text2}> Forgot Password? </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {style.button} onPress = {() => checkLogin()}>
        <Text style = {style.text}> Login </Text>
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
    top:130,
    margin:20,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf:'center',
    top:130,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#2596be',
  },
  logo:{
    width: 375,
    height: 100, 
    paddingBottom: 32,
    top:100
  },
  text: { 
    color: 'black',
    fontSize: 25,
  },
  text2: { 
    color: '#2596be',
    fontSize: 12,
    top:120,
    marginLeft:120,
  },
  text3: { 
    color: '#2596be',
    fontSize: 15,
    top:150,
    marginLeft:20,
  },
})

export default LoginScreen;
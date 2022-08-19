import { placeholder } from '@babel/types';
import React, { useState, useEffect, useCallback } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
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
  return (
    <View style={style.container}>
      <Image style={style.logo} source={require('../assests/Images/image.png')}/>

      <TextInput placeholder='Username' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      
      />

      <TextInput placeholder='Password' 
      style = {style.input} 
      placeholderTextColor={"#808080"}
      secureTextEntry={true}
      />

      <TouchableOpacity onPress = {() => alert("Password forgotten")}>
      <Text style = {style.text2}> Forgot Password? </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {style.button} onPress = {() => navigation.navigate('Navigate')}>
        <Text style = {style.text}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => navigation.navigate('Signup')}>
        <Text style = {style.text3}> Don't have an account? Sign up here. </Text>
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
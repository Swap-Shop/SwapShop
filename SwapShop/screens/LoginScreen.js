import React, { useState} from 'react'; 

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {View,Text, TouchableOpacity,SafeAreaView,StyleSheet, ImageBackground, TextInput, LogBox ,Modal} from 'react-native';


  
const LoginScreen = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const navigation = useNavigation();
  const user = auth().currentUser; 
  

    const LoginFunction = () => {

      auth()
      .signInWithEmailAndPassword(data.username.trim().toLowerCase(), data.password.trim().toLowerCase())
      .then(() => {
        console.log('Sign Successful');
        alert ('Sign successful')
        navigation.navigate('Navigate')
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          console.log('password is invalid for the given email');
          alert("Incorrect password")
        }

        if (error.code === 'auth/user-not-found') {
          console.log('there is no user corresponding to the given email');
          alert("This account does not exist, please sign up")
        }
    
        console.error(error);
      });
    }

    const ResetPassword = () =>{
      auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        alert("A reset link has been sent to your email")
      })
      .catch(error => {
        console.error(error);
      });
    }

    const checkLogin = () =>{
      if(data.username.length == 0 || data.password.length == 0){
        alert("Please enter all the fields")
      }
      else if(data.password.length < 6){
        alert("Password should be 6 or more characters")
      }
      else{
          LoginFunction()
      }
    }

    const GetTextInput = (val) =>{
      setData({
        ...data,
        username:val,
      })
    }
  
    const GetPasswordInput = (val) =>{
      setData({
        ...data,
        password: val,
      })
    }

  return (
    <View style={style.container}>
      <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}>
      
            <SafeAreaView style={{ alignSelf: 'center',justifyContent: 'center',alignItems: 'center',
                backgroundColor: '#fff',height: 490,width: 350,borderRadius: 20,marginTop: '30%',
                opacity:2,shadowColor: '#000',shadowOffset: {width: 0,height: 0.5}}}>

                <Text style = {style.heading} >Login</Text>

                <TextInput placeholder='Email' 
                style = {style.input} 
                placeholderTextColor={"#808080"}
                onChangeText = {(e) => GetTextInput(e)}
                />

                <TextInput placeholder='Password' 
                style = {style.input} 
                placeholderTextColor={"#808080"}
                secureTextEntry={true}
                onChangeText = {(e) => GetPasswordInput(e)}
                />

                
                <Text style = {{  color: '#2596be',marginLeft:140}} onPress={() => navigation.navigate('password')} > 
                Forgot Password? </Text>

                <TouchableOpacity style = {style.button} onPress = {() => checkLogin()}>
                  <Text style = {style.text}> Login </Text>
                </TouchableOpacity>
            </SafeAreaView>

      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    width:250,
    top:130,
    margin:20,
  },
  input: {
    marginLeft:15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor:'#A9A9A9',
    width:250,
    backgroundColor:'#FFFFFF',
    margin:10,
  },
  heading:{
    width: 375,
    height: 100, 
    fontSize: 60,
    fontStyle:'italic',
    fontWeight:'bold',
    color:'#A9A9A9',
    marginLeft: 220,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
  },
  logo:{
    width: 375,
    height: 100, 
    paddingBottom: 32,
    top:100
  },
  text: { 
    color: 'white',
    fontSize: 25,
  },
  text2: { 
    color: '#2596be',
    top:115,
  },
  text3: { 
    color: '#2596be',
    fontSize: 15,
    top:150,
    marginLeft:20,
  },
})

export default LoginScreen;
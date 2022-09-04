import React, { useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,LogBox , ImageBackground, Modal} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen = () => {
  LogBox.ignoreLogs(['Warning: ...']); // the two lines of code is used to hide error messages from react native
  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  const [data, setData] = useState({ // variable declarations 
    username: '',
    password: '',
    ConfirmPassword: '',
  });
  const navigation = useNavigation(); // variable used to help in navigation 
 
  const SignUpFunction = () => { // this function is used to communicate with the firebase authentication database

    auth() // the auth() function is used to make a request to the firebase database.
    .createUserWithEmailAndPassword(data.username.trim().toLowerCase(), data.password.trim().toLowerCase()) // the signup function is used save the email and password onto the firebase authentication database.
    .then(() => { // executed if the details are successfully saved on the database. 
      console.log('User account created');
      alert ('Success!, you have created an account')
      navigation.navigate('Navigate') // if the user details are in the database then the user is directed to the home page of the app.
    })
    .catch(error => { // executed when errors occur in storing details on firebase database, user will not be able to access app.
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

  const checkSignUp = () =>{ // used to check if the user input is valid.
    if(data.username.length == 0 || data.password.length == 0)
    {
      alert("Please enter all fields!")
    }
    else if(data.password.length < 6){
      alert ("Paswords must be 6 characters or more")
    }
    else if(data.password.toString() != data.ConfirmPassword.toString()){
      alert ("Passwords do not match!")
    }
    else{
      SignUpFunction() // if no errors then a request will be made to the firebase database
    }
    
  }

  const GetTextInput = (val) =>{ // this function is used to get the email that the user entered.
    setData({
      ...data,
      username:val,
    })
  }

  const GetPasswordInput = (val) =>{ // this function is used to get the password that the user entered.
    setData({
      ...data,
      password: val,
    })
  }

  const GetConfirmPasswordInput = (val) =>{ // this function is used to get the confirm password that the user entered.
    setData({
      ...data,
      ConfirmPassword: val
    })
  }

  return (
    <View style={style.container}>
      <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}>
        {/* <Modal visible={modalOpen} animationType="fade" transparent={true}> */}
          <SafeAreaView style={{ alignSelf: 'center',justifyContent: 'center',alignItems: 'center',
                backgroundColor: '#fff',height: 500,width: 350,borderRadius: 20,marginTop: '30%',
                opacity:2,shadowColor: '#000',shadowOffset: {width: 0,height: 0.5}}}>

                  <Text style = {style.heading} > Sign Up </Text>

                  <TextInput placeholder='Enter email address' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  onChangeText = {(e) => GetTextInput(e)}>
                  </TextInput>

                  <TextInput placeholder='Enter Password' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  secureTextEntry={true}
                  onChangeText = {(e) => GetPasswordInput(e)}
                  />

                  <TextInput placeholder='Confrim Password' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  secureTextEntry={true}
                  onChangeText = {(e) => GetConfirmPasswordInput(e)}
                  />


                  <TouchableOpacity style = {style.button} onPress = {() => checkSignUp()}>
                    <Text style = {style.text}> Sign Up </Text>
                  </TouchableOpacity>
                  <Text style={{color: '#2596be',}} onPress={() => navigation.navigate('Login')}>
                    Already have an account? login here</Text>
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
    marginLeft:15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor:'#A9A9A9',
    width:250,
    backgroundColor:'#FFFFFF',
    margin:10,
    color:'#000'
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf:'center',
    top:5,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
  },
  heading:{
    width: 375,
    height: 100, 
    fontSize: 60,
    fontStyle:'italic',
    fontWeight:'bold',
    color:'#A9A9A9',
    marginLeft: 130,
  },
  text: { 
    color: 'white',
    fontSize: 25,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
})

export default SignUpScreen;
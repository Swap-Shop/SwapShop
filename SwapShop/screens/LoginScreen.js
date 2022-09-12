import React, { useState} from 'react'; 
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {View,KeyboardAvoidingView,Text, TouchableOpacity,SafeAreaView,StyleSheet, ImageBackground, TextInput, LogBox ,Modal} from 'react-native';


  
const LoginScreen = ({navigation}) => {
  LogBox.ignoreLogs(['Warning: ...']); // the two lines of code is used to hide error messages from react native
  LogBox.ignoreAllLogs();//Ignore all log notifications

  const [data, setData] = useState({ // variable declarations 
    username: '',
    password: '',
  });
  //const navigation = useNavigation();
  //const user = auth().currentUser; // code used to retrieve the user ID from firebase 
  

    const LoginFunction = () => { // this function is used to communicate with the firebase authentication database

      auth() // the auth() function is used to make a request to the firebase database.
      .signInWithEmailAndPassword(data.username.trim().toLowerCase(), data.password.trim().toLowerCase()) // the signin function is used to check if the given email and password is on the database
      .then(() => {
        console.log('Sign Successful');  
        navigation.navigate('Navigate')// if the user details are in the database then the user is directed to the home page of the app.
      })
      .catch(error => { // these are the various errors that will be displayed if they is a fault with the user input.
        if (error.code === 'auth/wrong-password') {
          console.log('password is invalid for the given email');
          alert("Incorrect password")
        }

        if (error.code === 'auth/user-not-found') {
          console.log('there is no user corresponding to the given email');
          alert("Oops! ¯\_(ツ)_/¯......Account does not exist. Sign Up to start using SwapShop")
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Email not in the right format');
          alert("Please enter a valid email")
        }
    
        console.error(error);
      });
    }

    const checkLogin = () =>{ // this function is used to check if the user input is valid. 
      if(data.username.length == 0 || data.password.length == 0){
        alert("Please enter all the fields") // alert error that will appear 
      }
      else if(data.password.length < 6){
        alert("Password should be 6 or more characters") // alert error that will appear 
      }
      else{ 
          LoginFunction() // if no errors then the user input can then be processed by using this function 
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

  return (
    <KeyboardAvoidingView style={style.container}>
      <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}>
      
            <SafeAreaView style={{ alignSelf: 'center',justifyContent: 'center',alignItems: 'center',
                backgroundColor: '#fff',height: 490,width: 350,borderRadius: 20,marginTop: '30%',
                opacity:2,shadowColor: '#000',shadowOffset: {width: 0,height: 0.5}}}>

                <Text style = {style.heading} >Login</Text>

                <TextInput placeholder='Email' 
                style = {style.input} 
                placeholderTextColor={"#808080"}
                onChangeText = {(e) => GetTextInput(e)} // called everytime the email is changed
                />

                <TextInput placeholder='Password' 
                style = {style.input} 
                placeholderTextColor={"#808080"}
                secureTextEntry={true}
                onChangeText = {(e) => GetPasswordInput(e)} // called everytime the password is changed
                />

                
                <Text style = {{  color: '#2596be',marginLeft:140}} onPress={() => navigation.navigate('password')} > 
                Forgot Password? </Text> 
                
                <TouchableOpacity style = {style.button} onPress = {() => checkLogin()} testID='Login.Button'>
                  <Text style = {style.text}> Login </Text>
                </TouchableOpacity>

                {/* a clickable text to redirect user to signup page */}
                <Text style={{color: '#2596be',}} onPress={() => navigation.navigate('Signup')} testID='signUpLink'>
                    Don't have an account? signup here</Text>
            </SafeAreaView>

      </ImageBackground>
    </KeyboardAvoidingView>
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
    color:'#000'
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
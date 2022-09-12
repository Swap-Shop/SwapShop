import React, { useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,LogBox , ImageBackground, Modal, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from "@react-native-firebase/firestore"

const SignUpScreen = ({navigation}) => {
  LogBox.ignoreLogs(['Warning: ...']); // the two lines of code is used to hide error messages from react native
  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  const [data, setData] = useState({ // variable declarations
    firstname:'',
    surname:'', 
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  
  //const navigation = useNavigation(); // variable used to help in navigation 

  const submitToDatabase = (userId, firstname, surname, email) =>{
    firestore()
    .collection('Users')
    .doc(userId)
    .set({
      firstname: firstname,
      surname: surname,
      email: email
    })
    .then(() => {
      console.log('User added')
    })
    .catch(error => {
      console.log(error)
    })
  }
 
  const SignUpFunction = () => { // this function is used to communicate with the firebase authentication database

    auth() // the auth() function is used to make a request to the firebase database.
    .createUserWithEmailAndPassword(data.email.trim().toLowerCase(), data.password.trim().toLowerCase()) // the signup function is used save the email and password onto the firebase authentication database.
    .then(() => { // executed if the details are successfully saved on the database. 
      console.log('User account created');
      const user = auth().currentUser;
      submitToDatabase(user.uid, data.firstname.trim(), data.surname.trim(), data.email.trim().toLowerCase());
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

      if (error.code === 'auth/network-request-failed') {
        console.log('No internet connection');
        alert ('Oops! ¯\_(ツ)_/¯...... Cannot swap now, No internet connection')
      }
  
      console.error(error);
    });
  }

  const checkSignUp = () =>{ // used to check if the user input is valid.
    if(data.email.length == 0 || data.password.length == 0 || data.firstname.length == 0 || data.surname.length == 0)
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

  const GetFirstName = (val) =>{ // this function is used to get the email that the user entered.
    setData({
      ...data,
      firstname:val,
    })
  }

  const GetSurname = (val) =>{ // this function is used to get the email that the user entered.
    setData({
      ...data,
      surname:val,
    })
  }

  const GetEmail = (val) =>{ // this function is used to get the email that the user entered.
    setData({
      ...data,
      email:val,
    })
  }

  const GetPassword = (val) =>{ // this function is used to get the password that the user entered.
    setData({
      ...data,
      password: val,
    })
  }

  const GetConfirmPassword = (val) =>{ // this function is used to get the confirm password that the user entered.
    setData({
      ...data,
      ConfirmPassword: val
    })
  }

  return (
    <KeyboardAvoidingView style={style.container}>
      <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}>
        {/* <Modal visible={modalOpen} animationType="fade" transparent={true}> */}
          <SafeAreaView style={{ alignSelf: 'center',justifyContent: 'center',alignItems: 'center',
                backgroundColor: '#fff',height: 650,width: 350,borderRadius: 20,marginTop: '30%',
                opacity:2,shadowColor: '#000',shadowOffset: {width: 0,height: 0.5}}}>

                  <Text style = {style.heading} > Sign Up </Text>

                  <TextInput placeholder='Enter first name' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  onChangeText = {(e) => GetFirstName(e)}>
                  </TextInput>

                  <TextInput placeholder='Enter surname' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  onChangeText = {(e) => GetSurname(e)}>
                  </TextInput>

                  <TextInput placeholder='Enter email address' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  onChangeText = {(e) => GetEmail(e)}>
                  </TextInput>

                  <TextInput placeholder='Enter Password' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  secureTextEntry={true}
                  onChangeText = {(e) => GetPassword(e)}
                  />

                  <TextInput placeholder='Confrim Password' 
                  style = {style.input} 
                  placeholderTextColor={"#808080"}
                  secureTextEntry={true}
                  onChangeText = {(e) => GetConfirmPassword(e)}
                  />

                    {/* a button to render checkSignup function, which then add the user to  the database */}
                  <TouchableOpacity style = {style.button} onPress = {() => checkSignUp()}>
                    <Text style = {style.text}> Sign Up </Text>
                  </TouchableOpacity>
                  
                  {/* a clickable text to redirect the user to the login page  */}
                  <Text style={{color: '#2596be',}} onPress={() => navigation.navigate('Login')} testID='loginLink'>
                    Already have an account? login here</Text>
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
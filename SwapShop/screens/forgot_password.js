import React from "react";
import {View,Text, TouchableOpacity,SafeAreaView,StyleSheet, ImageBackground, TextInput, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Password = () =>{

    const navigation = useNavigation();
    const user = auth().currentUser; 
   
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
   
    return(
        <View style={style.container}>
        <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}>

              <SafeAreaView style={{ alignSelf: 'center',justifyContent: 'center',alignItems: 'center',
                  backgroundColor: '#fff',height: 310,width: 350,borderRadius: 20,marginTop: '50%',
                  opacity:5,shadowColor: '#000',shadowOffset: {width: 0,height: 0.5}}}>
  
                  <Text style = {style.heading} >Password Reset</Text>
  
                  <Text style = {style.text2}  onPress = {() => navigation.navigate('Login')}> Go back to Login </Text>
                  
                  <TouchableOpacity style = {style.button} onPress = {() => ResetPassword()}>
                    <Text style = {style.text}>Reset</Text>
                  </TouchableOpacity>

              </SafeAreaView>          
        </ImageBackground>
        
  
      </View>
    )
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
      width: 255,
      height: 90, 
      fontSize: 35,
      fontStyle:'italic',
      fontWeight:'bold',
      color:'#A9A9A9',
      
    },
    button: {
      margin: 15,
      padding: 15,
      width: 250,
      alignItems: 'center',
      alignSelf:'center',
      // top:5,
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
export default Password;

import React, { useState, useEffect} from 'react'; 
import { ImageBackground, SafeAreaView, Text, View,  Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
// import "fontsource-league-spartan";


const Welcome_Page = ({navigation}) => {
  
  const [initializing, setInitializing] = useState(true); // variable declarations 
  const [user, setUser] = useState();

  function onAuthStateChanged(user) { // this is called every time the user authentication has changed. 
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => { // executed every time the user is on the page and is used to check if the user is successfully logged in to help with automatic login
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const checkSignIn = () => {
    if (initializing)
    {
      return null
    };
  
    if (!user) { // if the user is a first time user then the useEffect will return false and user will be directed to login page 
      navigation.navigate('Login')
    }

    if (user) {
      navigation.navigate('Navigate') // if the user has already logged on before then the app will automatically send the user to the home page.
      console.log(user.uid)
    }
  }
  return (
    <SafeAreaView style={{flex: 2}}>
       <ImageBackground source={require('../assets/Image/gradient.jpg')} style={{flex:1}}   >

          <View style={{ alignItems: 'center'}}>
               <Text style={{color:'#A9A9A9' ,fontSize: 55,paddingTop:55, fontWeight:'bold', fontFamily:'League Spartan'}}>Welcome</Text>   
               <Image style={{width: 300,height:300}} source={require('../assets/Image/image.png')}/>
          </View>

          <View style={{alignItems:'center', marginHorizontal:60}}>
            <TouchableOpacity style={{backgroundColor:"#A9A9A9", borderRadius:10, height: 50, 
            marginHorizontal:50, width:250, marginVertical:10}} 
            testID='signUpButton' onPress={() => 
            navigation.navigate('Signup')}>
              <Text style={{fontWeight:"bold", fontSize: 23, textAlign: 'center', top:7, color:'white'}}> Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:"#A9A9A9", borderRadius:10, height: 50, 
            marginHorizontal:50, width:250, marginVertical:10}} 
            testID='loginButton' onPress={() => 
            checkSignIn()}>
              <Text style={{fontWeight:"bold", fontSize: 23, textAlign: 'center', top:7, color:'white'}}> Login </Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </SafeAreaView>
  );

};
export default Welcome_Page;
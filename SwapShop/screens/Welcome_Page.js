import React, { useState, useEffect} from 'react'; 
import { ImageBackground, SafeAreaView, Text, View,  Image } from 'react-native';
import { Button } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
// import "fontsource-league-spartan";


const Welcome_Page = ({navigation}) => {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const checkSignIn = () => {
    if (initializing)
    {
      return null
    };
  
    if (!user) {
      navigation.navigate('Login')
    }

    if (user) {
      navigation.navigate('Navigate')
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
                <Button 
                title='Sign Up'
                onPress = {() => navigation.navigate('Signup')}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 , fontFamily:'League Spartan'}}
                buttonStyle={{backgroundColor: '#A9A9A9', borderRadius: 10}}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 250,
                  marginVertical: 10,
                }}
                >
                </Button>

                <Button
                title='Login'
                onPress = {() => checkSignIn()}
                titleStyle={{ fontWeight: 'bold', fontSize: 23, fontfamily: "League Spartan"}}
                buttonStyle={{backgroundColor: '#A9A9A9', borderRadius: 10}}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 250,
                  marginVertical: 10,
            }}></Button>
          </View>
      </ImageBackground>
    </SafeAreaView>
  );

};
export default Welcome_Page;
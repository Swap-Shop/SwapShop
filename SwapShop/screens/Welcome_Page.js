import React from 'react';
import { ImageBackground, SafeAreaView, Text, View, StyleSheet, TextInput,  Image } from 'react-native';
import { Button } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import "@fontsource/league-spartan";


const Welcome_Page = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 2,  borderRadius:20}}>
       <ImageBackground source={require('../assests/Images/gradient.jpg')} style={{flex:1}}   >

          <View style={{ alignItems: 'center'}}>

               <Text style={{color:'#A9A9A9' ,fontSize: 55,paddingTop:55, fontWeight:'bold', fontFamily:'League Spartan'}}>Welcome</Text>   
               <Image style={{width: 300,height:300}} source={require('../assests/Images/image.png')}/>
          </View>

          <View style={{alignItems:'center', marginHorizontal:60}}>
                <Button 
                title='SignUp'
                onPress = {() => navigation.navigate('Signup')}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 , fontFamily:'League Spartan'}}
                buttonStyle={{backgroundColor: '#A9A9A9', borderRadius: 10}}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                }}
                >
                </Button>

                <Button
                title='Login'
                onPress = {() => navigation.navigate('Login')}
                titleStyle={{ fontWeight: 'bold', fontSize: 23, fontfamily: "League Spartan"}}
                buttonStyle={{backgroundColor: '#A9A9A9', borderRadius: 10}}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
              marginVertical: 10,
            }}></Button>
          </View>


          
      </ImageBackground>
       
    
      
    </SafeAreaView>
  
  );
};
export default Welcome_Page;
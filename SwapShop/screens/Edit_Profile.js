import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {StatusWrapper} from '../styles/AddPageStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Akira} from 'react-native-textinput-effects';
// import { Sae } from 'react-native-textinput-effects';

console.reportErrorAsExceptions = false;
const Edit = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [data, setData] = useState({
    // variable declarations
    firstname: '',
    surname: '',
    old_email: '',
    new_email: '',
    password: '',
    userId: null,
    filename: '',
  });

  return (
    <ImageBackground
      source={require('../assets/Image/gradient.jpg')}
      style={{flex: 1}}
      blurRadius={0.5}>
      <SafeAreaView
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F2F3F4',
          height: 500,
          width: 350,
          borderRadius: 20,
          opacity: 1,
          marginTop: '5%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        <Text style={style.heading}>Edit Account{"\n"} Information</Text>
        <TouchableOpacity onPress={() => navigation.navigate('emails')}
        style={{
            backgroundColor: '#A9A9A9',
            borderRadius: 10,
            height: 70,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            marginHorizontal: 50,
            width: 250,
            marginVertical: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              top: 10,
              fontSize: 20,
              fontWeight: '900',
            }}>
            Change User Email Address
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#A9A9A9',
            borderRadius: 10,
            height: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            marginHorizontal: 50,
            width: 250,
            marginVertical: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('password')}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              top: 10,
              fontSize: 20,
              fontWeight: '900',
            }}>
            Change user password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#333333',
            borderRadius: 10,
            height: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            marginHorizontal: 50,
            width: 250,
            marginVertical: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('setting')}
          >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              top: 10,
              fontSize: 20,
              fontWeight: '900',
            }}>
            Back To Settings Page
          </Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Edit;

const style = StyleSheet.create({
  heading: {
    width: 375,
    height: 100,
    fontSize: 30,
    bottom: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginLeft: 220,

    fontWeight: 'bold',
  },
})

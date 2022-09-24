import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Settings = ({navigation}) => {
  const [data, setData] = useState({
    // variable declarations
    username: '',
    password: '',
  });
  //const navigation = useNavigation();
  //const user = auth().currentUser; // code used to retrieve the user ID from firebase

  const LoginFunction = () => {
    // this function is used to communicate with the firebase authentication database

    auth() // the auth() function is used to make a request to the firebase database.
      .signInWithEmailAndPassword(
        data.username.trim().toLowerCase(),
        data.password.trim().toLowerCase(),
      ) // the signin function is used to check if the given email and password is on the database
      .then(() => {
        console.log('Sign Successful');
        navigation.navigate('Navigate'); // if the user details are in the database then the user is directed to the home page of the app.
      });
  };
  return (
    <ImageBackground
      source={require('../assets/Image/gradient.jpg')}
      style={{flex: 1}}>
      {/* <Modal visible={modalOpen} animationType="fade" transparent={true}> */}
      <SafeAreaView
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 250,
          width: 350,
          borderRadius: 20,
          marginTop: '50%',
          opacity: 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        <TouchableOpacity
          style={{
            height: 150,
            width: 150,
            borderRadius: 70,
            borderWidth: 1,

            borderColor: '#D3D3D3',
            backgroundColor: '#D3D3D3',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15}}>Upload Image</Text>
        </TouchableOpacity>

        <Text style={{fontWeight: '900', fontSize: 35, color: '#555555' }}>User Name</Text>
        <TouchableOpacity onPress={() => navigation.navigate('edits')}>
          <Text
            style={{marginBottom: 10, color: '#555555', fontWeight: 'bold'}}>
            Edit profile
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Settings;

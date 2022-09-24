import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Akira} from 'react-native-textinput-effects';
// import { Sae } from 'react-native-textinput-effects';
console.reportErrorAsExceptions = false;
const Edit = ({navigation}) => {
  const [data, setData] = useState({
    // variable declarations
    firstname: '',
    surname: '',
    email: '',
  });
  //const navigation = useNavigation();

  const GetFirstName = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      firstname: val,
    });
  };

  const GetSurname = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      surname: val,
    });
  };

  const GetEmail = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      email: val,
    });
  };
  // await auth().currentUser.updateEmail('joe.bloggs@new-email.com')
  const Update_User = (userId, firstname, surname, email) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        firstname: firstname,
        surname: surname,
        email: email,
      })
      .then(() => {
        console.log('Profile Updated');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const UpdateFunction = () => {
    console.log('User account updated');
    const user = auth().currentUser;
    Update_User(
      user.uid,
      data.firstname.trim(),
      data.surname.trim(),
      data.email.trim().toLowerCase(),
    );
  };

  const checkUpdate = () => {
    // used to check if the user input is valid.
    if (
      data.firstname.length == 0 ||
      data.surname.length == 0 ||
      data.email.length == 0
    ) {
      alert('Please enter all fields!');
    } else {
      UpdateEmail();
      UpdateFunction(); // if no errors then a request will be made to the firebase database
    }
  };
  const UpdateEmail = async () => {
    // const user = auth().currentUser;
    await auth()
      .currentUser.updateEmail(data.email)
      .then(() => {
        // Email updated!
        console.log('Email Updated');
        // ...
        navigation.navigate('setting');
      })
      .catch(error => {
        // An error occurred
        console.log(' An error occurred');
        // ...
      });
  };

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
          height: 400,
          width: 350,
          borderRadius: 20,
          opacity: 1,
          marginTop: '40%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'normal',
            top: 20,
            color: '#555555',
          }}>
          Edit Account information
        </Text>
        <Akira
          label={'First Name'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250, marginTop: 20}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetFirstName(e)}
        />
        <Akira
          label={'Last Name'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetSurname(e)}
        />
        <Akira
          label={'Email'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetEmail(e)}
        />

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
            marginTop: 40,
          }}
          onPress={() => checkUpdate()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              top: 10,
              fontSize: 20,
              fontWeight: '900',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Edit;

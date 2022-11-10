import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  LogBox,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {Fumi} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';

import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';

const SignUpScreen = ({navigation}) => {
  LogBox.ignoreLogs(['Warning: ...']); // the two lines of code is used to hide error messages from react native
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const [data, setData] = useState({
    // variable declarations
    firstname: '',
    surname: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  //const navigation = useNavigation(); // variable used to help in navigation

  const submitToDatabase = (userId, firstname, surname, email) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        firstname: firstname,
        surname: surname,
        email: email,
      })
      .then(() => {
        console.log('User added');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const SignUpFunction = () => {
    // this function is used to communicate with the firebase authentication database

    auth() // the auth() function is used to make a request to the firebase database.
      .createUserWithEmailAndPassword(
        data.email.trim().toLowerCase(),
        data.password.trim().toLowerCase(),
      ) // the signup function is used save the email and password onto the firebase authentication database.
      .then(() => {
        // executed if the details are successfully saved on the database.
        console.log('User account created');
        const user = auth().currentUser;
        submitToDatabase(
          user.uid,
          data.firstname.trim(),
          data.surname.trim(),
          data.email.trim().toLowerCase(),
        );
        alert('Success!, you have created an account');
        navigation.navigate('Navigate'); // if the user details are in the database then the user is directed to the home page of the app.
      })
      .catch(error => {
        // executed when errors occur in storing details on firebase database, user will not be able to access app.
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('That email address is invalid!');
        }

        if (error.code === 'auth/network-request-failed') {
          console.log('No internet connection');
          alert(
            'Oops! ¯_(ツ)_/¯...... Cannot swap now, No internet connection',
          );
        }

        console.error(error);
      });
  };

  const checkSignUp = () => {
    // used to check if the user input is valid.
    if (
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.firstname.length == 0 ||
      data.surname.length == 0
    ) {
      alert('Please enter all fields!');
    } else if (data.password.length < 6) {
      alert('Paswords must be 6 characters or more');
    } else if (data.password.toString() != data.ConfirmPassword.toString()) {
      alert('Passwords do not match!');
    } else {
      SignUpFunction(); // if no errors then a request will be made to the firebase database
    }
  };

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

  const GetPassword = val => {
    // this function is used to get the password that the user entered.
    setData({
      ...data,
      password: val,
    });
  };

  const GetConfirmPassword = val => {
    // this function is used to get the confirm password that the user entered.
    setData({
      ...data,
      ConfirmPassword: val,
    });
  };

  return (
    <KeyboardAvoidingView style={style.container}>
      <ImageBackground
        source={require('../assets/Image/gradient.jpg')}
        style={{flex: 1}}>
        {/* <Modal visible={modalOpen} animationType="fade" transparent={true}> */}
        <SafeAreaView
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2F3F4',
            height: 650,
            width: 370,
            borderRadius: 20,
            marginTop: '10%',
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
          <Text style={style.heading}> Sign Up </Text>
          <Fumi
            label={'First Name'}
            iconClass={Icon}
            iconName={'person-sharp'}
            iconColor={'#f95a25'}
            iconSize={20}
            iconWidth={40}
            inputStyle={{color: 'black'}}
            labelStyle={{color: 'grey'}}
            style={{
              width: 320,
              backgroundColor: '#F9F9F3',
              opacity: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            testID="confirmpass"
            inputPadding={16}
            onChangeText={e => GetFirstName(e)}
          />
          <Fumi
            label={'Last Name'}
            iconClass={Icon}
            iconName={'person-sharp'}
            iconColor={'#f95a25'}
            iconSize={20}
            iconWidth={40}
            inputStyle={{color: 'black'}}
            labelStyle={{color: 'grey'}}
            style={{
              width: 320,
              backgroundColor: '#F9F9F3',
              marginTop: 10,
              opacity: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            inputPadding={16}
            onChangeText={e => GetSurname(e)}
          />
          <Fumi
            label={'Email'}
            iconClass={Icon}
            iconName={'mail'}
            iconColor={'#f95a25'}
            iconSize={20}
            iconWidth={40}
            inputStyle={{color: 'black'}}
            labelStyle={{color: 'grey'}}
            style={{
              width: 320,
              backgroundColor: '#F9F9F3',
              marginTop: 10,
              opacity: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            inputPadding={16}
            onChangeText={e => GetEmail(e)}
          />
          <Fumi
            label={'Password'}
            iconClass={Icon}
            iconName={'key-outline'}
            iconColor={'#f95a25'}
            iconSize={20}
            iconWidth={40}
            inputStyle={{color: 'black'}}
            labelStyle={{color: 'grey'}}
            style={{
              width: 320,
              backgroundColor: '#F9F9F3',
              marginTop: 10,
              opacity: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            secureTextEntry={true}
            inputPadding={16}
            onChangeText={e => GetPassword(e)}
          />

          <BarPasswordStrengthDisplay password={data.password} width={310} />

          <Fumi
            label={'Confirm Password'}
            iconClass={Icon}
            iconName={'key-outline'}
            iconColor={'#f95a25'}
            iconSize={20}
            iconWidth={40}
            inputStyle={{color: 'black'}}
            labelStyle={{color: 'grey'}}
            style={{
              width: 320,
              backgroundColor: '#F9F9F3',
              marginTop: 15,
              opacity: 2,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={e => GetConfirmPassword(e)}
          />

          <BarPasswordStrengthDisplay
            password={data.ConfirmPassword}
            width={310}
          />

          {/* <TextInput
            placeholder="Enter first name"
            style={style.input}
            placeholderTextColor={'#808080'}
            onChangeText={e => GetFirstName(e)}></TextInput>

          <TextInput
            placeholder="Enter surname"
            style={style.input}
            placeholderTextColor={'#808080'}
            clearButtonMode="always"
            onChangeText={e => GetSurname(e)}></TextInput>

          <TextInput
            placeholder="Enter email address"
            style={style.input}
            placeholderTextColor={'#808080'}
            onChangeText={e => GetEmail(e)}></TextInput>

          <TextInput
            placeholder="Enter Password"
            style={style.input}
            placeholderTextColor={'#808080'}
            secureTextEntry={true}
            onChangeText={e => GetPassword(e)}
          />

          <TextInput
            placeholder="Confrim Password"
            style={style.input}
            placeholderTextColor={'#808080'}
            secureTextEntry={true}
            placeholders
            onChangeText={e => GetConfirmPassword(e)}
          /> */}

          {/* a button to render checkSignup function, which then add the user to  the database */}
          <TouchableOpacity
            style={style.button}
            testID="register"
            onPress={() => checkSignUp()}>
            <Text style={style.text}> Sign Up </Text>
          </TouchableOpacity>

          {/* a clickable text to redirect the user to the login page  */}
          <Text
            style={{color: '#2596be', fontWeight: 'bold'}}
            onPress={() => navigation.navigate('Login')}
            testID="loginLink">
            Already have an account? login here
          </Text>
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
    marginLeft: 15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#A9A9A9',
    width: 250,
    backgroundColor: '#FFFFFF',
    margin: 10,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    top: 5,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  heading: {
    width: 375,
    height: 100,
    fontSize: 60,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginLeft: 130,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});

export default SignUpScreen;

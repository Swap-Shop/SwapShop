import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {Fumi} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';

const Password = ({navigation}) => {
  const [username, setUsername] = useState('');
  // const [ setData] = useState({
  //   // variable declarations
  //   username: '',
  // });
  //const navigation = useNavigation();

  const GetTextInput = val => {
    // this function is used to get the email that the user entered.
    setUsername(val);
  };

  const checkEmail = () => {
    // this function is used to check if the user input is valid.
    if (username.length == 0) {
      Alert.alert('Please enter your email'); // alert error that will appear
    } else {
      ResetPassword(); // if no errors then the user input can then be processed by using this function
    }
  };

  const ResetPassword = () => {
    // this function is used to reset the users password
    auth()
      .sendPasswordResetEmail(username.toLowerCase()) // the email is sent to the firebase database to check if the user does exist.
      .then(() => {
          Alert.alert('A reset link has been sent to your email'); // if successful a reset link is sent to the user to reset their password.
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          // if unsuccessful errors will appear and link will not be sent.
          console.log(error);
            Alert.alert('Please enter a valid email address');
        }

        if (error.code === 'auth/user-not-found') {
          console.log(error);
            Alert.alert(
            'Oops! ¯_(ツ)_/¯......Account does not exist. Sign Up to start using SwapShop',
          );
        }

        console.error(error);
      });
  };

  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../assets/Image/gradient.jpg')}
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2F3F4',
            height: 370,
            width: 370,
            borderRadius: 20,
            marginTop: '40%',
            opacity: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
          }}>
          <Text style={style.heading}>Password Reset</Text>

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
            testID="username"
            value={username}
            inputPadding={16}
            onChangeText={e => GetTextInput(e)} //   onChangeText={e => GetTextInput(e)}  cal
          />

          {/* <TextInput
            placeholder="Email"
            style={style.input}
            placeholderTextColor={'#808080'}
            onChangeText={e => GetTextInput(e)} //   onChangeText={e => GetTextInput(e)}  called everytime the email is changed
          /> */}
          {/* a clickable text which  redirect user back to the login page */}
          <Text
            style={style.text2}
            onPress={() => navigation.navigate('Login')}
            testID="forgetpassLink">
            {' '}
            Go back to Login{' '}
          </Text>

          {/* a button to render the check email function */}
          <TouchableOpacity testID="Link"
            style={style.button} onPress={() => checkEmail()}>
            <Text style={style.text}>Reset</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    width: 250,
    top: 130,
    margin: 20,
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
  heading: {
    width: 255,
    height: 90,
    fontSize: 35,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#A9A9A9',
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    // top:5,
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
  logo: {
    width: 375,
    height: 100,
    paddingBottom: 32,
    top: 100,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  text2: {
    color: '#2596be',
    top: 115,
  },
  text3: {
    color: '#2596be',
    fontSize: 15,
    top: 150,
    marginLeft: 20,
  },
});
export default Password;

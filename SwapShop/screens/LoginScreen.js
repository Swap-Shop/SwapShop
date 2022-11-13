import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TextInput,
  LogBox,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Fumi} from 'react-native-textinput-effects';
const LoginScreen = ({navigation}) => {
  LogBox.ignoreLogs(['Warning: ...']); // the two lines of code is used to hide error messages from react native
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [ setData] = useState({
  //   // variable declarations
  //   username: '',
  //   password: '',
  // });
  //const navigation = useNavigation();
  //const user = auth().currentUser; // code used to retrieve the user ID from firebase

  const LoginFunction = () => {
    // this function is used to communicate with the firebase authentication database

    auth() // the auth() function is used to make a request to the firebase database.
      .signInWithEmailAndPassword(
        username.trim().toLowerCase(),
        password.trim().toLowerCase(),
      ) // the signin function is used to check if the given email and password is on the database
      .then(() => {
        console.log('Sign Successful');
        navigation.navigate('Navigate'); // if the user details are in the database then the user is directed to the home page of the app.
      })
      .catch(error => {
        // these are the various errors that will be displayed if they is a fault with the user input.
        if (error.code === 'auth/wrong-password') {
          console.log('password is invalid for the given email');
          Alert.alert('Incorrect password');
        }

        if (error.code === 'auth/user-not-found') {
          console.log('there is no user corresponding to the given email');
          Alert.alert(
            'Oops! ¯_(ツ)_/¯......Account does not exist. Sign Up to start using SwapShop',
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Email not in the right format');
          Alert.alert('Please enter a valid email');
        }

        console.error(error);
      });
  };

  const checkLogin = () => {
    // this function is used to check if the user input is valid.
    if (username.length == 0 || password.length == 0) {
      Alert.alert('Please enter all the fields'); // Alert.alert error that will appear
    } else if (password.length < 6) {
      Alert.alert('Password should be 6 or more characters'); // Alert.alert error that will appear
    } else {
      LoginFunction(); // if no errors then the user input can then be processed by using this function
    }
  };

  const GetTextInput = val => {
    // this function is used to get the email that the user entered.
    setUsername(val);
  };

  const GetPasswordInput = val => {
    // this function is used to get the password that the user entered.
    setPassword(val);
  };

  return (
    <KeyboardAvoidingView style={style.container}>
      <ImageBackground
        source={require('../assets/Image/gradient.jpg')}
        style={{flex: 1}}>
        <SafeAreaView
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F2F3F4',
            height: 490,
            width: 370,
            borderRadius: 20,
            marginTop: '30%',
            opacity: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.68,
            shadowRadius: 16.0,
            elevation: 24,
          }}>
          <Text style={style.heading}>Login</Text>

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
            testID="username"
            value={username}
            inputPadding={16}
            onChangeText={e => GetTextInput(e)} // called everytime the email is changed
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
            secureTextEntry={true}
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
            testID="password"
            value={password}
            inputPadding={16}
            onChangeText={e => GetPasswordInput(e)} // called everytime the password is changed
          />

        
          <Text
            style={{color: '#2596be', marginLeft: 170, marginTop: 20}}
            testID="forgotpassword"

            onPress={() => navigation.navigate('password')}>
            Forgot Password?{' '}
          </Text>

          <TouchableOpacity
            style={style.button}
            onPress={() => checkLogin()}
            testID="LoginButton">
            <Text style={style.text}> Login </Text>
          </TouchableOpacity>

          {/* a clickable text to redirect user to signup page */}
          <Text
            style={{color: '#2596be', fontWeight: 'bold'}}
            onPress={() => navigation.navigate('Signup')}
            testID="signUpLink">
            Don't have an account? signup here
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
    width: 375,
    height: 100,
    fontSize: 60,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#A9A9A9',
    marginLeft: 220,

    fontWeight: 'bold',
  },
  button: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
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
    fontWeight: 'bold',
  },
  text2: {
    color: '#2596be',
    top: 115,
    fontWeight: 'bold',
  },
  text3: {
    color: '#2596be',
    fontSize: 15,
    top: 150,
    marginLeft: 20,
  },
});

export default LoginScreen;

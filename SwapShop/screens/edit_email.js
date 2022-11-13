import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
  ImageBackground,
  TextInput,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Fumi} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';

const Edit_email = ({navigation}) => {
  const [email, setEmail] = useState('');

  // const [data, setData] = useState({
  //   // variable declarations
  //   email: '',
  // });

  const GetTextInput = val => {
    // this function is used to get the email that the user entered.
    setEmail(val);
  };

  const checkEmail = () => {
    // this function is used to check if the user input is valid.
    if (email.length == 0) {
      Alert.alert('Please enter your new email'); // alert error that will appear
    } else {
      ResetEmail(); // if no errors then the user input can then be processed by using this function
    }
  };

  const ResetEmail = () => {
    const user = auth().currentUser;
    user
      .updateEmail(email)
      .then(() => {
        Alert.alert('Email updated successfully');
        navigation.navigate('edits');
        console.log('success');
      })
      .catch(e => {
        console.log(e);
      });
    /*
    user.updateEmail(data.email).then(() => {
        console.log("Email Updated")
    })
    .catch((error) => {
        console.log(error);
    })
    */
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
          <Text style={style.heading}>Email Reset</Text>

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
            testID="email"
            value={email}
            inputPadding={16}
            onChangeText={e => GetTextInput(e)}
          />

          {/* a button to render the check email function */}
          <TouchableOpacity
            style={style.button}
            testID="reset"
            onPress={() => checkEmail()}>
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
export default Edit_email;

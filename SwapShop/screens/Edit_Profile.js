import React, {useState} from 'react';

import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
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

  const GetOldEmail = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      old_email: val,
    });
  };
  const GetNewEmail = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      new_email: val,
    });
  };
  const GetPassword = val => {
    // this function is used to get the email that the user entered.
    setData({
      ...data,
      password: val,
    });
  };
  // await auth().currentUser.updateEmail('joe.bloggs@new-email.com')
  const Update_User = (userId, firstname, surname, new_email) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        firstname: firstname,
        surname: surname,
        new_email: new_email,
      })
      .then(() => {
        console.log('Profile Updated');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const UpdateFunction = async url => {
    const user = auth().currentUser;

    await auth()
  
    .user.updateEmail(data.new_email).then(() => {
      // Email updated!
      Update_User(
        user.uid,
        data.firstname.trim(),
        data.surname.trim(),
        data.new_email.trim().toLowerCase(),
      );
      SubmitProfilePicture(url);
      alert('Success!, account has been updated');
      console.log('Email Updated');
      navigation.navigate('setting');
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
  };

  const checkUpdate = async () => {
    // used to check if the user input is valid.
    if (
      data.firstname.length == 0 ||
      data.surname.length == 0 ||
      data.old_email.length == 0 ||
      data.new_email.length == 0 ||
      data.password.length == 0
    ) {
    } else if (data.password.length < 6) {
      alert('Password should be 6 or more characters');
    } else if (image == null) {
      Alert.alert(
        'Oops! ¯_(ツ)_/¯......',
        'Please provide an image of the product',
      );
    } else {
      // UpdateEmail();
      const url = await uploadImage();
      UpdateFunction(url); // if no errors then a request will be made to the firebase database
    }
  };

  const TakePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(image => {
        setImage(image);
      })
      .then({})
      .catch(error => {
        console.log(error);
      });
  };
  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(image => {
        setImage(image);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const uploadImage = async () => {
    let downloadURL;
    const uploadUri = image.path.toString();
    data.filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(data.filename);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      downloadURL = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
    } catch (e) {
      console.log(e);
    }

    return downloadURL;
  };
  const SubmitProfilePicture = async url => {
    firestore()
      .collection('Profile')
      .add({
        userID: data.userId,
        Profile_URL: url,
      })
      .then(() => {
        Alert.alert('Your picture has been added Successfully!');
      })
      .catch(error => {
        console.log(error);
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
          height: 670,
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'normal',
            top: 5,
            color: '#555555',
          }}>
          Edit Account information
        </Text>
        <View
          style={{
            borderColor: '#A9A9A9',
            marginTop: 20,
            borderRadius: 60,
            borderWidth: 2,
            width: 120,
            height: 120,
            backgroundColor: '#A9A9A9',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            // alignContent:'center',
            // justifyContent:'center',
            // alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{marginLeft: 32, marginTop: 20}}
            onPress={() => TakePhotoFromCamera()}>
            <Text
              style={{fontSize: 12, fontStyle: 'normal', fontWeight: '900'}}>
              Camera
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 0,
              marginTop: 10,
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: '900',
            }}>
            --------- or --------
          </Text>
          <TouchableOpacity
            style={{marginLeft: 30, marginTop: 0}}
            onPress={() => TakePhotoFromGallery()}>
            <Text
              style={{fontSize: 12, fontStyle: 'normal', fontWeight: '900'}}>
              Upload from gallery
            </Text>
          </TouchableOpacity>
        </View>
        <Akira
          label={'First Name'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250, marginTop: 0}}
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
          label={'Old Email'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetOldEmail(e)}
        />
        <Akira
          label={'Password'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetPassword(e)}
        />
        <Akira
          label={'New Email'}
          // this is used as active and passive border color
          borderColor={'#A9A9A9'}
          inputPadding={16}
          labelHeight={24}
          style={{width: 250}}
          labelStyle={{color: 'grey'}}
          onChangeText={e => GetNewEmail(e)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text style={{fontWeight: 'normal', color: '#000000'}}>
              {transferred} % Completed!
            </Text>
            <ActivityIndicator size="large" color="#333333" />
          </StatusWrapper>
        ) : (
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
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Edit;

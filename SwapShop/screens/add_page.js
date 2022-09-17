import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import {waitFor} from '@testing-library/react-native';

const AddPage = ({navigation}) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    // variable declarations
    product_name: '',
    product_desc: '',
    firstname: '',
    surname: '',
    image_URL: '',
    userId: null,
    filename: '',
  });

  useEffect(() => {
    const userInfo = auth().currentUser;
    data.userId = userInfo.uid;
    const subscriber = firestore()
      .collection('Users')
      .doc(userInfo.uid)
      .onSnapshot(documentSnapshot => {
        data.firstname = documentSnapshot.data().firstname;
        data.surname = documentSnapshot.data().surname;
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const GetProductName = val => {
    setData({
      ...data,
      product_name: val,
    });
  };

  const GetProductDesc = val => {
    setData({
      ...data,
      product_desc: val,
    });
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
    const uploadUri = image.path.toString();
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(uploadUri);
      data.image_URL = await storage().ref(filename).getDownloadURL();
      console.log(data.image_URL);
    } catch (e) {
      console.log(e);
    }
  };

  const SubmitData = async () => {
    firestore()
      .collection('Products')
      .doc(data.userId)
      .set({
        firstname: data.firstname,
        surname: data.surname,
        Product_Name: data.product_name,
        Product_Description: data.product_desc,
        Product_URL: data.image_URL,
        Post_Time: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Post added!');
        Alert.alert('Post added');
        navigation.navigate('Navigate');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkInput = () => {
    if (data.product_desc.length == 0 || data.product_name.length == 0) {
      Alert.alert('Oops! ¯_(ツ)_/¯......', 'Please enter all fields');
    } else if (image == null) {
      Alert.alert(
        'Oops! ¯_(ツ)_/¯......',
        'Please provide an image of the product',
      );
    } else {
      uploadImage();
      SubmitData();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Image/gradient.jpg')}
      style={{flex: 1}}>
      <SafeAreaView
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 600,
          width: 350,
          borderRadius: 20,
          marginTop: '15%',
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
        <TextInput
          placeholder="Name of product"
          style={style.inputProductName}
          placeholderTextColor={'#808080'}
          onChangeText={e => GetProductName(e)}
        />

        <TextInput
          placeholder="Description of product"
          style={style.inputDescriptionName}
          placeholderTextColor={'#808080'}
          textAlignVertical={'top'}
          multiline
          numberOfLines={4}
          onChangeText={e => GetProductDesc(e)}
        />

        <TouchableOpacity
          style={style.TakePhotoButton}
          onPress={() => TakePhotoFromCamera()}>
          <Text style={{fontWeight: 'normal', color: '#333333'}}>
            {' '}
            Take photo{' '}
          </Text>
          <Icon name="camera-outline" size={20} />
        </TouchableOpacity>

        <Text style={style.lineSeperator}>------------- or ------------</Text>

        <TouchableOpacity
          style={style.ChoosePhotoButton}
          onPress={() => TakePhotoFromGallery()}>
          <Text style={{fontWeight: 'normal', color: '#333333'}}>
            {' '}
            Upload photo from gallery{' '}
          </Text>
          <Icon name="image-outline" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={style.AddPostbutton}
          onPress={() => checkInput()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: '900',
            }}>
            {' '}
            Add Post{' '}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default AddPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputProductName: {
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
  inputDescriptionName: {
    marginLeft: 15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#A9A9A9',
    width: 250,
    height: 110,
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
  },
  AddPostbutton: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
    top: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  TakePhotoButton: {
    margin: 15,
    padding: 15,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#3D6EDF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  ChoosePhotoButton: {
    margin: 15,
    padding: 15,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#DF3D3D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  lineSeperator: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    // color: '#A9A9A9',
    fontWeight: 'normal',
    color: '#333333',
  },
});

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
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import {StatusWrapper} from '../styles/AddPageStyles';

// navigation for add page
const ItemTobeTradedPage = ({route, navigation}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [data, setData] = useState({
    // variable declarations
    product_name: '',
    product_desc: '', // product description
    image_URL: '',
    filename: '',
  });
  const userInfo = auth().currentUser;
  data.userId = userInfo.uid;

  const GetProductName = val => {
    // used to get the product name
    setData({
      ...data,
      product_name: val,
    });
  };

  const GetProductDesc = val => {
    // used to get the product description
    setData({
      ...data,
      product_desc: val,
    });
  };

  const TakePhotoFromGallery = () => {
    // this is used to load an image from the gallery.
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
    // this is used to take a picture through the camera of the device.
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
      // this is used to calculate the bits transfered during the image loading process.
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

  const SubmitData = async url => {
    // this is used to submit the data to the backend
    firestore()
      .collection('ItemToBeTraded')
      .add({
        TokenID: route.params.ProductID,
        CustomerID: route.params.CustomerID,
        OwnerID: route.params.OwnerID,
        ProductName: data.product_name,
        ProductDescription: data.product_desc,
        ProductURL: url,
      })
      .then(() => {
        console.log('Product added!');
        Alert.alert(
          'WooHoo! Request sent',
          'Request pending, check trade tab for response',
        );
        navigation.navigate('Navigate');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkInput = async () => {
    if (data.product_desc.length == 0 || data.product_name.length == 0) {
      // this code is used to check the input the user has enetered.
      Alert.alert('Oops! ¯_(ツ)_/¯......', 'Please enter all fields');
    } else if (image == null) {
      Alert.alert(
        'Oops! ¯_(ツ)_/¯......',
        'Please provide an image of the product',
      );
    } else {
      const url = await uploadImage();
      SubmitTrade();
      SubmitData(url);
    }
  };

  const returnButton = async () => {
    Alert.alert(
      'Are you sure you want to leave?'[
        ({
          text: 'No',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Navigate'),
        })
      ],
      {cancelable: false},
    );
  };

  const SubmitTrade = () => {
    firestore()
      .collection('Trade')
      .add({
        ProductID: route.params.ProductID,
        OwnerID: route.params.OwnerID,
        CustomerID: route.params.CustomerID,
        OwnerName: route.params.OwnerName,
        ProductName: route.params.ProductName,
        ProductDescription: route.params.ProductDescription,
        ProductImg: route.params.ProductImg,
        Outcome: 'pending',
      })
      .then(() => {
        console.log('Added to trade list');
      })
      .catch(error => {
        console.log(error);
      });
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
          backgroundColor: '#F2F3F4',
          height: 600,
          width: 350,
          bottom: 20,
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
          testID="productName"
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
            Upload photo{' '}
          </Text>
          <Icon name="image-outline" size={20} />
        </TouchableOpacity>

        {uploading ? (
          <StatusWrapper>
            <Text style={{fontWeight: 'normal', color: '#000000'}}>
              {transferred} % Completed!
            </Text>
            <ActivityIndicator size="large" color="#333333" />
          </StatusWrapper>
        ) : (
          <TouchableOpacity
            style={style.AddPostbutton}
            onPress={() => checkInput()}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 20,
                fontWeight: '900',
              }}>
              {' '}
              Trade{' '}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={style.ReturnPostbutton}
          testID="post"
          onPress={() => returnButton()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: '900',
            }}>
            {' '}
            Return{' '}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ItemTobeTradedPage;

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
    backgroundColor: '#90EE90',
    bottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  ReturnPostbutton: {
    margin: 15,
    padding: 15,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#000000',
    bottom: 20,
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
    width: 120,
    height: 50,
    top: 10,
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
    width: 120,
    height: 50,
    bottom: 10,
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

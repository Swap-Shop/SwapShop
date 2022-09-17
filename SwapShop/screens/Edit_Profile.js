import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import { Sae } from 'react-native-textinput-effects';

const Edit = () => {
  return (
    <ImageBackground
      source={require('../assets/Image/gradient.jpg')}
      style={{flex: 1}}>
      {/* <Modal visible={modalOpen} animationType="fade" transparent={true}> */}
      <SafeAreaView
        style={{
          alignSelf: 'center',
          //   justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 560,
          width: 350,
          borderRadius: 20,
          opacity: 1,
          marginTop: '15%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}>
        <Image
          source={require('../assets/Icon/no-photos.png')}
          style={{
            height: 150,
            width: 150,
            borderRadius: 70,
            borderWidth: 1,

            borderColor: '#D3D3D3',
            backgroundColor: '#D3D3D3',
          }}></Image>

        <Text style={{fontSize: 20, fontWeight: 'normal', top: 10}}>
          Account information
        </Text>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{marginTop: 30, marginRight: 30}}>
            <Text
              style={{fontSize: 15, fontWeight: 'normal', color: '#333333'}}>
              Name
            </Text>
          </View>
          <View style={{marginLeft: 0}}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                backgroundColor: '#fff',

                width: 180,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              }}
              placeholderTextColor={'#333333'}></TextInput>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{marginTop: 30, marginRight: 10}}>
            <Text
              style={{fontSize: 15, fontWeight: 'normal', color: '#333333'}}>
              Surname
            </Text>
          </View>
          <View style={{marginLeft: 0}}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                marginLeft: 0,
                width: 180,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              }}
              placeholderTextColor={'#333333'}></TextInput>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{marginTop: 30, marginRight: 32}}>
            <Text
              style={{fontSize: 15, fontWeight: 'normal', color: '#333333'}}>
              Email
            </Text>
          </View>
          <View style={{marginLeft: 0}}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                marginLeft: 0,
                width: 180,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              }}
              placeholderTextColor={'#333333'}></TextInput>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{marginTop: 30, marginRight: 5}}>
            <Text
              style={{fontSize: 15, fontWeight: 'normal', color: '#333333'}}>
              Password
            </Text>
          </View>
          <View style={{marginLeft: 0}}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderBottomWidth: 1,

                width: 180,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              }}
              placeholderTextColor={'#333333'}></TextInput>
          </View>
        </View>

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
            marginTop: 50,
          }}>
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

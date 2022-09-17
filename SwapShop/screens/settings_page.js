import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const Settings = ({navigation}) => {
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
        <Text style={{fontWeight: '900', fontSize: 35}}>User Name</Text>
        <TouchableOpacity onPress={() => navigation.navigate('edits')}>
          <Text
            style={{marginBottom: 10, color: '	#555555', fontWeight: 'bold'}}>
            Edit profile
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Settings;

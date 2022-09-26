import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

const Settings = ({navigation}) => {
  // const user = auth().currentUser;
  const [credential, setCredential] = useState(true);
  const [loading, setLoading] = useState(true);
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Welcome');
  };

  useEffect(() => {
    const list = [];
    const Credentials = async () => {
      try {
        await firestore()
          .collection('Profile')
          .get()
          .then(querySnapshot => {
            console.log('Total users: ', querySnapshot.size);

            querySnapshot.forEach(doc => {
              list.push({
                id: doc.id,
                Profile_URL: url,
              });
              console.log('User ID: ', doc.id, doc.data());
            });
          });
        setCredential(list);
        // console.log('list', setCredential(list));

        if (loading) {
          setLoading(false);
        }
        console.log('list', list);
      } catch (error) {}
    };
    Credentials();
  }, []);
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
          height: 350,
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
        {/* <FlatList
          data={credential}
          renderItem={({item}) => (
            <View
              style={{
                borderColor: '#A9A9A9',
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
              <Image source={item.Profile_URL}></Image>
            </View>
          )}
          keyExtractor={item => item.id}
          style={{marginTop: 40}}
        /> */}

        <View
          style={{
            borderColor: '#A9A9A9',
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
          <Image source={{credential}}></Image>
          {/* <Text>{item.Profile_URL}</Text> */}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('edits')}>
          <Text
            style={{
              marginBottom: 20,
              top: 10,
              color: '#2596be',
              fontWeight: 'bold',
            }}>
            Edit profile
          </Text>
        </TouchableOpacity>
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
            marginTop: 10,
          }}
          onPress={() => signOut()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              top: 10,
              fontSize: 20,
              fontWeight: '900',
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Settings;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ImageBackground, SafeAreaView, Text, View, Image} from 'react-native';

import Home from './home_page';
import Messages from './messagesPage';
import Settings from './settings_page';

const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    // A bottom navigation menu
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: () => null,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 30,
          paddingBottom: 50,
          backgroundColor: '#D3D3D3',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
      }}>
      {/* a clickable home icon label which redirect user to home page */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
              <Image
                source={require('../assets/Icon/icons8-home-64.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#000',
                  top: 10,
                  fontWeight: 'bold',
                }}
              />
            </View>
          ),
        }}
      />
      {/* a clickable add icon label which redirect user to add page */}
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
              <Image
                source={require('../assets/Icon/icons8-chating-64.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#000' : '#000',
                  top: 10,
                  fontWeight: 'bold',
                }}
              />
            </View>
          ),
        }}
      />
      {/* a clickable settings icon label which redirect user to settings page */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
              <Image
                source={require('../assets/Icon/profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#000',
                  top: 10,
                  fontWeight: 'bold',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Navigation;

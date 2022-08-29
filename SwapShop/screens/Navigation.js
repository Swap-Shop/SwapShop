import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { ImageBackground, SafeAreaView, Text, View,  Image } from 'react-native';

import Home from "./home_page";
import AddPage from "./add_page";
import Settings from "./settings_page";

const Tab = createBottomTabNavigator();
const Navigation = () =>{
    return(
        // <Text>Welcome</Text>
        <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true,header: () => null,tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              height: 80,
              paddingBottom: 50
            }
          }
        }>
                <Tab.Screen
                name="Home"
                component={Home}
                options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image 
                        source={require('../assets/Icon/icons8-home-64.png')} 
                        resizeMode='contain'
                        style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#A9A9A9' : '#000'
                        }}
                    />
                    <Text style={{color: focused ? '#A9A9A9' : '#000', fontSize: 12, top: 5}}>Home</Text>
                    </View>
                ),
                }}
            />

                <Tab.Screen
                name="AddPage"
                component={AddPage}
                options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image 
                        source={require('../assets/Icon/icons8-add-50.png')} 
                        resizeMode='contain'
                        style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#A9A9A9' : '#000'
                        }}
                    />
                    <Text style={{color: focused ? '#A9A9A9': '#000', fontSize: 12, top: 5}}>Add</Text>
                    </View>
                ),
                }}
            />
             <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                    <Image 
                        source={require('../assets/Icon/icons8-settings-50.png')} 
                        resizeMode='contain'
                        style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? '#A9A9A9' : '#000'
                        }}
                    />
                    <Text style={{color: focused ? '#A9A9A9': '#000', fontSize: 12, top: 5}}>Settings</Text>
                    </View>
                ),
                }}
            />
        </Tab.Navigator>
    )
};
export default Navigation;
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Welcome_Page from '../screens/Welcome_Page';
import Navigation from '../screens/Navigation';
import Password from '../screens/forgot_password';
import AddPage from '../screens/add_page';
import Edit from '../screens/Edit_Profile';
import Settings from '../screens/settings_page';
import SearchPage from '../screens/SearchPage';
import EditEmailPage from '../screens/edit_email';
import ViewPostPage from '../screens/ViewPostPage';
import ItemTobeTradedPage from '../screens/ItemTobeTraded';
import ViewItemTobeTradedPage from '../screens/ViewItemTobeTraded';
import TradePage from '../screens/TradePage';
import ViewUserRequests from '../screens/ViewUserRequests';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome_Page} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddPage" component={AddPage} />
        <Stack.Screen name="ItemTobeTradedPage" component={ItemTobeTradedPage} />
        <Stack.Screen name="ViewItemTobeTradedPage" component={ViewItemTobeTradedPage} />
        <Stack.Screen name="ViewUserRequests" component={ViewUserRequests} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="TradePage" component={TradePage} />
        <Stack.Screen name="ViewPostPage" component={ViewPostPage} />
        <Stack.Screen name="Navigate" component={Navigation} />
        <Stack.Screen name="password" component={Password} />
        <Stack.Screen name="edits" component={Edit} />
        <Stack.Screen name="setting" component={Settings} />
        <Stack.Screen name="emails" component={EditEmailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

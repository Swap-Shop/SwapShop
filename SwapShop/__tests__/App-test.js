import React from "react";
import LoginScreen from "../screens/LoginScreen";
import Welcome_Page from "../screens/Welcome_Page";
import SignUpScreen from "../screens/SignUpScreen";
import forgot_password from "../screens/forgot_password";
import { Alert } from 'react-native';
import { render, screen, renderHook, fireEvent} from '@testing-library/react-native';


test('Welcome page should render correctly', () => { 
    
  const page = render(<Welcome_Page/>);

  const loginButton = page.getByTestId("signUpButton");
  

});

test('Login page should render correctly', async() => { 
  
  const page = render(<LoginScreen/>);
  
});

test('SignUp screen should render correctly', () => { 
    
  const page = render(<SignUpScreen/>);

});

test('ForgetPassword screen should render correctly', () => { 
    
  const page = render(<forgot_password/>);

});
// the following lines are used to check if all the pages are rendering properly 

test('welcome page should go to signUp page', () =>{
  const navigation = {navigate:()=>{}}
  spyOn(navigation, 'navigate');

  const page = render(<Welcome_Page navigation={navigation}/>)
  const signUpButton = page.getByTestId('signUpButton');

  fireEvent.press(signUpButton);

  expect(navigation.navigate).toHaveBeenCalledWith("Signup");
});

/*
test('sign up link works properly', () =>{
  const navigation = {navigate:()=>{}}
  spyOn(navigation, 'navigate');

  const page = render(<LoginScreen navigation={navigation}/>)
  const loginButton = page.getByTestId('signUpButton');

  fireEvent.press(loginButton);

  expect(navigation.navigate).toHaveBeenCalledWith("Signup");
});
*/


/*
test('welcome page should go to Login page', () =>{
  const checkSignIn= {checkSignIn:()=>{}}
  spyOn(checkSignIn, 'checkSignIn');

  const page = render(<Welcome_Page checkSignIn={checkSignIn}/>)
  const loginButton = page.getByTestId('loginButton');

  fireEvent.press(loginButton);

  expect(checkSignIn.checkSignIn).toHaveBeenCalled();
});
*/










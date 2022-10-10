import React from "react";
// import LoginScreen from "../screens/LoginScreen";
// import Welcome_Page from "../screens/Welcome_Page";
// import SignUpScreen from "../screens/SignUpScreen";
// import ForgetPasswordPage from "../screens/forgot_password";
import SearchPage from "../screens/SearchPage";
import ViewPostPage from "../screens/ViewPostPage";
import { Alert } from 'react-native';
import { render, screen, renderHook, fireEvent} from '@testing-library/react-native';
// // import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

// search page unit test
test('Should apply the value when changing text', () => {
  const { getByTestId } = render(<SearchPage />);
  const input = getByTestId('search');
  fireEvent.changeText(input, 'Hisence');
  expect(input.props.value).toBe('Hisence');
});

test('go back to the serach', () =>{
  const navigation = {navigate:()=>{}}
  spyOn(navigation, 'navigate');

  const page = render(<ViewPostPage navigation={navigation}/>)
  const forgotPasswordLink = page.getByTestId('post');

  fireEvent.press(forgotPasswordLink);

  expect(navigation.navigate).toHaveBeenCalledWith("SearchPage");
});



// welcome page test
// test('Welcome page should render correctly', () => { 
    
//   const page = render(<Welcome_Page/>);

//   const loginButton = page.getByTestId("signUpButton");
  

// });
// test('renders the correct welcome text', () => {
//   const {queryByText} = render(<Welcome_Page/>)
//   expect(queryByText("Welcome")).not.toBeNull();
// })
// the following lines are used to check if all the pages are rendering properly 

// test('welcome page should go to signUp page', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<Welcome_Page navigation={navigation}/>)
//   const signUpButton = page.getByTestId('signUpButton');

//   fireEvent.press(signUpButton);

//   expect(navigation.navigate).toHaveBeenCalledWith("Signup");
// });

// test('welcome page should go to Navigation', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<Welcome_Page navigation={navigation}/>)
//   const signUpButton = page.getByTestId('loginButton');

//   fireEvent.press(signUpButton);

//   expect(navigation.navigate).toHaveBeenCalledWith("Login");
// });

//login page tests
// test('Login page should render correctly', async() => { 
  
//   const page = render(<LoginScreen/>);
  
// });



// test("Allowed to login", async() =>{
//   const user = await auth() .signInWithEmailAndPassword('swap@gmail.com', 'Swapshop14/*');
//   expect(user).toBeTruthy();
//   expect(user).toBe(true);
// })
// the following lines are used to check if all the pages are rendering properly 

// test('login link works properly on Sign Up page', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<SignUpScreen navigation={navigation}/>)
//   const loginLink = page.getByTestId('loginLink');

//   fireEvent.press(loginLink);

//   expect(navigation.navigate).toHaveBeenCalledWith("Login");
// });
//signup page tests
// test('SignUp screen should render correctly', () => { 
    
//   const page = render(<SignUpScreen/>);

// });
// the following lines are used to check if all the pages are rendering properly 

// test('sign up link works properly on Login page', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<LoginScreen navigation={navigation}/>)
//   const signUpLink = page.getByTestId('signUpLink');

//   fireEvent.press(signUpLink);

//   expect(navigation.navigate).toHaveBeenCalledWith("Signup");
// });

//forgot password page test
// test('ForgetPassword screen should render correctly', () => { 
    
//   const page = render(<ForgetPasswordPage/>);

// });

// the following lines are used to check if all the pages are rendering properly 

// test('link back to login page from password reset', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<ForgetPasswordPage navigation={navigation}/>)
//   const forgotPasswordLink = page.getByTestId('forgetpassLink');

//   fireEvent.press(forgotPasswordLink);

//   expect(navigation.navigate).toHaveBeenCalledWith("Login");
// });


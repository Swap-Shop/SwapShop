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
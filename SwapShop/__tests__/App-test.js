import React, {useState} from 'react';
import LoginScreen from "../screens/LoginScreen";
import Welcome_Page from '../screens/Welcome_Page';
// import ViewPostPage from "../screens/ViewPostPage";
import ViewUserRequestPage from '../screens/ViewUserRequests';
import ViewItemToBeTraded from '../screens/ViewItemTobeTraded';
import Home from '../screens/home_page';
// import TradePage from "../screens/TradePage";
import Password from '../screens/forgot_password';
// import ItemTobeTradedPage from "../screens/ItemTobeTraded";
import AddPage from "../screens/add_page";
// import ForgetPasswordPage from "../screens/forgot_password";
import SignUpScreen from "../screens/SignUpScreen"
import Settings from '../screens/settings_page';
import SearchPage from '../screens/SearchPage';
import ViewPostPage from '../screens/ViewPostPage';
import Edit_email from '../screens/edit_email';
import Edit from '../screens/Edit_Profile';
import {Alert, View} from 'react-native';
import {
  render,
  screen,
  renderHook,
  fireEvent,
} from '@testing-library/react-native';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const eventData = {
  nativeEvent: {
    contentOffset: {
      y: 500,
    },
    contentSize: {
      // Dimensions of the scrollable content
      height: 500,
      width: 100,
    },
    layoutMeasurement: {
      // Dimensions of the device
      height: 100,
      width: 100,
    },
  },
}


//view item to be  ViewItemToBeTraded page
test('navigate to Navigation page from ViewItemToBeTraded', () => {
  //test a button to navigate to the navigation page from the from ViewItemToBeTraded page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<ViewItemToBeTraded navigation={navigation} />);
  const button = page.getByTestId('post');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('Navigate');
});
it('render item on the ViewItemToBeTraded screen', () => {
  const {getByTestId} = render(<ViewItemToBeTraded />);
  const display = getByTestId('postitem');
  fireEvent.scroll(display, eventData);

  expect(display).toBeTruthy();
});

//settings page test case
test('navigate to Navigation page from Navigation page', () => {
  //test a button to navigate to the navigation page from the from ViewItemToBeTraded page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Settings navigation={navigation} />);
  const button = page.getByTestId('edit');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('edits');
});
// it('onclick it should redirect to login page or home page', () => {
//   //test a button to navigate  to the home  page if signed up before if not it takes them to log in page from welcome page

//   const page = render(<Settings />);
//   fireEvent.press(page.getByTestId('signout'));
// });



//view request page tests //ViewUserRequestPage
test('go back to navigation page', () => {
  //test a button to navigate to the navigation page from the from vewuserRequest page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<ViewUserRequestPage navigation={navigation} />);
  const button = page.getByTestId('post');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('Navigate');
});
it('render item on the viewUserRequest screen', () => {
  const {getByTestId} = render(<ViewItemToBeTraded />);
  const display = getByTestId('postitem');
  fireEvent.scroll(display, eventData);

  expect(display).toBeTruthy();
});


// search page unit test
test('Should apply the value when changing text', () => {
  //test whether the user input is applied when when the user types in the input
  const {getByTestId} = render(<SearchPage />);
  const input = getByTestId('search');
  fireEvent.changeText(input, 'Hisence');
  expect(input.props.value).toBe('Hisence');
});


//signupscreen  unit tests
test('Should apply the firstname when changing text', () => {
  //test whether the user 's firstname  is applied when when the user types in the input
    const {getByTestId} = render(<SignUpScreen />);
  const input = getByTestId('firstname');
  fireEvent.changeText(input, "peter");
  expect(input.props.value).toBe( "peter");
});
test('Should apply the surname when changing text', () => {
  //test whether the user 's lastname is applied when when the user types in the input
    const {getByTestId} = render(<SignUpScreen />);
  const input = getByTestId('secondname');
  fireEvent.changeText(input, "vervoord");
  expect(input.props.value).toBe( "vervoord");
});
test('Should apply the email when changing text', () => {
  //test whether the user 's email is applied when when the user types in the input
    const {getByTestId} = render(<SignUpScreen />);
  const input = getByTestId('email');
  fireEvent.changeText(input, "peter@gmail.com");
  expect(input.props.value).toBe( "peter@gmail.com");
});
test('Should apply the password when changing text', () => {
  //test whether the user 's password is applied when when the user types in the input
    const {getByTestId} = render(<SignUpScreen />);
  const input = getByTestId('parssword');
  fireEvent.changeText(input, "Swapshop14/**");
  expect(input.props.value).toBe( "Swapshop14/**");
});
test('Should apply the password confirmation when changing text', () => {
  //test whether the user 's password confirmation is applied when when the user types in the input
    const {getByTestId} = render(<SignUpScreen />);
  const input = getByTestId('confirmP');
  fireEvent.changeText(input, "Swapshop14/**");
  expect(input.props.value).toBe( "Swapshop14/**");
});
test('onclick should navigate to login page', () => {
  //test a button to navigate back to the login page  from the signup page if the user is already registered

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<SignUpScreen navigation={navigation} />);
  const button = page.getByTestId('loginLink');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('Login');
});

it('onclick it should  signup the user', () => {
  //test a button to to register the user

  const page = render(<SignUpScreen />);
  fireEvent.press(page.getByTestId('register'));
});




//loginpage unit tests
test('Should apply the password confirmation when changing text', () => {
  //test whether the user 's password confirmation is applied when when the user types in the input
    const {getByTestId} = render(<LoginScreen />);
  const input = getByTestId('password');
  fireEvent.changeText(input, "Swapshop14/**");
  expect(input.props.value).toBe( "Swapshop14/**");
});
test('Should apply the username when changing text', () => {
  //test whether the user 's firstname  is applied when when the user types in the input
    const {getByTestId} = render(<LoginScreen />);
  const input = getByTestId('username');
  fireEvent.changeText(input, "peter");
  expect(input.props.value).toBe( "peter");
});
test('onclick navigate to the forgot password page', () => {
  //test a button to navigate to the forgot password page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<LoginScreen navigation={navigation} />);
  const button = page.getByTestId('forgotpassword');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('password');
});
test('onclick navigate to the signup page', () => {
  //test a button to navigate to the forgot password page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<LoginScreen navigation={navigation} />);
  const button = page.getByTestId('signUpLink');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('Signup');
});
it('onclick it should  login the user', () => {
  //test a button to signup the user

  const page = render(<LoginScreen />);
  fireEvent.press(page.getByTestId('LoginButton'));
});



//edit email page

test('Should apply the email when changing text for reset purposes', () => {
  //test whether the user 's email is applied when when the user types in the input
    const {getByTestId} = render(<Edit_email />);
  const input = getByTestId('email');
  fireEvent.changeText(input, "peter@gmail.com");
  expect(input.props.value).toBe( "peter@gmail.com");
});
it('onclick it should  reset  the user email', () => {
  //test a button to signup the user

  const page = render(<Edit_email />);
  fireEvent.press(page.getByTestId('reset'));
});


//edit profile
test('onclick navigate to the settings page', () => {
  //test a button to navigate to the settings page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Edit navigation={navigation} />);
  const button = page.getByTestId('settings');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('setting');
});
test('onclick navigate to the forgot password page', () => {
  //test a button to navigate to the forgot password page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Edit navigation={navigation} />);
  const button = page.getByTestId('changepassword');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('password');
});

test('onclick navigate to the change email page', () => {
  //test a button to navigate to the change email page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Edit navigation={navigation} />);
  const button = page.getByTestId('changeemail');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('emails');
});





//forgot password page
test('Should apply the username when changing text', () => {
  //test whether the user 's firstname  is applied when when the user types in the input
    const {getByTestId} = render(<Password />);
  const input = getByTestId('username');
  fireEvent.changeText(input, "peter");
  expect(input.props.value).toBe( "peter");
});
it('onclick it should  send password reset link the user', () => {
  //test a button to send the reset to the user

  const page = render(<Password />);
  fireEvent.press(page.getByTestId('Link'));
});
test('onclick navigate to the Login page', () => {
  //test a button to navigate to the login page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Password navigation={navigation} />);
  const button = page.getByTestId('forgetpassLink');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('Login');
});






//Addpage unit test
// test('Should apply the username when changing text', () => {
//   //test whether the user 's firstname  is applied when when the user types in the input
//     const {getByTestId} = render(<AddPage />);
//   const input = getByTestId('productName');
//   fireEvent.changeText(input, "peter");
//   expect(input.props.value).toBe( "peter");
// });



//view psot page tests


it('render item', () => {
  const {getByTestId} = render(<ViewPostPage />);
  const display = getByTestId('postitem');
  fireEvent.scroll(display , eventData);

  expect(display).toBeTruthy();
});

test('go back to the search', () => {
  //test a button to navigate back to the search page from the viewpost page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<ViewPostPage navigation={navigation} />);
  const button = page.getByTestId('post');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('SearchPage');
});

//home page tests
test('go  to the search from home page', () => {
  //test a button to navigate back to the search page from the home page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Home navigation={navigation} />);
  const button = page.getByTestId('post');

  fireEvent.press(button);

  expect(navigation.navigate).toHaveBeenCalledWith('SearchPage');
});
it('render item on the home screen', () => {
  const {getByTestId} = render(<Home />);
  const display = getByTestId('render');
  fireEvent.scroll(display, eventData);

  expect(display).toBeTruthy();
});



//welcome page tests
test('onclick go to signup page', () => {
  //test a button to navigate  to the signup  page from welcome page

  const navigation = {navigate: () => {}};
  spyOn(navigation, 'navigate');

  const page = render(<Welcome_Page navigation={navigation} />);
  const signup = page.getByTestId('signUpButton');

  fireEvent.press(signup);

  expect(navigation.navigate).toHaveBeenCalledWith('Signup');
});

it('onclick it should redirect to login page or home page', () => {
  //test a button to navigate  to the home  page if signed up before if not it takes them to log in page from welcome page

  const page = render(<Welcome_Page />);
  fireEvent.press(page.getByTestId('loginButton'));
});





// test('Should apply the value when changing text', () => {
//   //test whether the user input is applied when when the user types in the input
//   const instanceOf = renderer.create(<SignUpScreen />).getInstance();
//   instanceOf.GetFirstName("hello");
//   expect(instanceOf.state.firstname).toEqual("hello");
//   // const input = getByTestId('confirmpass');
//   // expect(input.props.value).toBe('Hisence');
// });

// test('onclick go to login page', () =>{
//   const navigation = {navigate:()=>{}}
//   spyOn(navigation, 'navigate');

//   const page = render(<SignUpScreen navigation={navigation}/>)
//   const login = page.getByTestId('loginLink');

//   fireEvent.press(login);

//   expect(navigation.navigate).toHaveBeenCalledWith("Login");
// });

// it('onclick it should redirect to home page', () => {
//   const page = render(<SignUpScreen/>);
//   fireEvent.press(page.getByTestId('register'));
// });

// it('should find the Itemtrade button via testId', () => {

//   const {getByTestId} = render(<ViewItemToBeTraded />);

//   const foundButton = getByTestId("postitem");

//   expect(foundButton).toBeTruthy();
// });
// it('render' ,() => {
//   const {getByTestId} = render(<SearchPage />);
//   const display = getByTestId("display");
//   fireEvent.press(display);

//   // expect(display).toBeTruthy();

// });
// describe('FlatList', () => {
//   let list = [
//       {post_name: 'hisence'},
//       {post_name: 'samsung A35'},
//       {post_name: 'KIC'},
//   ];
//   it('render' ,() => {
//     const {getByTestId} = render(<ViewPostPage />);
//     const display = getByTestId("display");
//     fireEvent.scroll(display);

//     expect(display).toBeTruthy();

//   })

// })



// afterEach(cleanup)

// it('scrolls to top and refreshes all items', async () => {
//   render(<SectionList />)
//   const {getByText, getByTestId} = screen

//   getByText(/pizza/i)
//   expect(() => getByText(/the impossible burger/i)).toThrow(
//     'Unable to find an element with text: /the impossible burger/i',
//   ) //intially not shown
//   fireEvent.scroll(getByTestId('flat-list'), eventData)
//   await waitForElementToBeRemoved(() => getByText(/loading more dishes/i), {
//     timeout: 1500,
//   })

//   await waitFor(() => {
//     expect(getByText(/the impossible burger/i)).toBeTruthy()
//   })
// })
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import LoginScreen from '../screens/LoginScreen';
import { TestScheduler } from 'jest';

// test("Registering with duplicate email" ,() =>{

// })
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  renderer.create(<App />);
});

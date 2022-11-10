// import {NativeModules} from 'react-native';
// NativeModules.ImagePickerManager = {
//   showImagePicker: jest.fn(),
//   launchCamera: jest.fn(),
//   launchImageLibrary: jest.fn(),
// };

jest.mock('@react-native-firebase/app', () => {
  return () => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
    alert: jest.fn()
  })
});

jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    alert: jest.fn()
  })
});


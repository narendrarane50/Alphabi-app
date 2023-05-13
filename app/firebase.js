import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase project configuration goes here
  apiKey: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
  authDomain: "alphabi-b8c31.firebaseapp.com",
  projectId: "alphabi-b8c31",
  storageBucket: "alphabi-b8c31.appspot.com",
  messagingSenderId: "50691374797",
  appId: "1:50691374797:web:a608044770fb5c1871f384",
  measurementId: "G-59LMHMMDNE",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

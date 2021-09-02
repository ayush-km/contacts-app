import firebase from "firebase/compat";

firebase.initializeApp({
  apiKey: "AIzaSyAVwaqpOps7BRQYcnskSOhxjX_cQ7vbBNY",
  authDomain: "contacts-app-96d88.firebaseapp.com",
  projectId: "contacts-app-96d88",
  storageBucket: "contacts-app-96d88.appspot.com",
  messagingSenderId: "109411837958",
  appId: "1:109411837958:web:42aefc31dc649619277b87",
});

export const db = firebase.firestore();

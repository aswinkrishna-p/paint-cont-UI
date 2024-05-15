// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj2z8_E67uc_UofA8YpzeWT5s3qcZVHAw",
  authDomain: "paint-cont.firebaseapp.com",
  projectId: "paint-cont",
  storageBucket: "paint-cont.appspot.com",
  messagingSenderId: "1098527786903",
  appId: "1:1098527786903:web:7b13245c315fe1c2c8e6d2",
  measurementId: "G-6E0JKQZ4WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage}
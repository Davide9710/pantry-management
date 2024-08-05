// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEbUZYuvyafjS4KUZ81aOVgs-cEkV8LpM",
  authDomain: "pantry-management-737cc.firebaseapp.com",
  projectId: "pantry-management-737cc",
  storageBucket: "pantry-management-737cc.appspot.com",
  messagingSenderId: "230505225959",
  appId: "1:230505225959:web:bc7449b9d14c47f73acc42",
  measurementId: "G-7SN1P1BPNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore, firebaseConfig}
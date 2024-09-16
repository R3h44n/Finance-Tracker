// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtRO0CneWQELDiZLSVvTglVBPkx0KAAJ4",
  authDomain: "finance-tracker-bcd7e.firebaseapp.com",
  projectId: "finance-tracker-bcd7e",
  storageBucket: "finance-tracker-bcd7e.appspot.com",
  messagingSenderId: "847273129351",
  appId: "1:847273129351:web:8ca95a35f7806f257f4f22",
  measurementId: "G-H656LREZB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};
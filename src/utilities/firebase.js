// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cs392-fitforecast.firebaseapp.com",
  databaseURL: "https://cs392-fitforecast-default-rtdb.firebaseio.com",
  projectId: "cs392-fitforecast",
  storageBucket: "cs392-fitforecast.appspot.com",
  messagingSenderId: "60622958951",
  appId: "1:60622958951:web:ed29cf8f7c7d0d5a32ffc2"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

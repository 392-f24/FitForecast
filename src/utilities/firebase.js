// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage";

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
  appId: "1:60622958951:web:ed29cf8f7c7d0d5a32ffc2",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const functions = getFunctions(firebase);
export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
export const storage = getStorage(firebase);
export default firebase;

if (!globalThis.EMULATION && import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  connectStorageEmulator(storage, "127.0.0.1", 9199);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "TpmD5Vudw1DB57mrvvabAMRn67Gs", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
    )
  );

  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

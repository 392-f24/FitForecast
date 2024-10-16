// auth.js
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, database } from './firebase';
//import { firebase } from './firebase';  // Import firebase from firebase.js
import { ref, set, get } from "firebase/database"; //Import database functions

// Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in:', user);
    //Save user data to database
    await saveUserData(user);

    return user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    return null;
  }
};

const saveUserData = (user) => {
    const userRef = ref(database, `Users/${user.uid}`);

    get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
            //user doesn't exist
            set(userRef, {
                closet: {},
                username: user.displayName,
                email: user.email,   
            });
            console.log('User data added to database')
        }
    });
};

// Function to sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error during sign-out:', error);
  }
};

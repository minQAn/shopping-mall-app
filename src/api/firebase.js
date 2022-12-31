import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Authentication
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(
    auth,
    provider.setCustomParameters({
      // to prevent auto login
      prompt: 'select_account', // https://developers.google.com/identity/openid-connect/openid-connect#authenticationuriparameters
    })
  ).catch(console.error);
}

export function logout() {
  signOut(auth)
    .then(() => {
      alert('Logged out successfully');
    })
    .catch(console.error);
}

// to check logged in or not, and when user changes, it operates
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

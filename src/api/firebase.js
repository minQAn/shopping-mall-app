import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { emptyAuthFromLocalStorage } from '../components/localStorage/AuthLocalStorage';
import { v4 as uuid } from 'uuid';

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

// the get data from firease. used it for admin check
const database = getDatabase(app);

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
      emptyAuthFromLocalStorage();
      alert('Logged out successfully');
    })
    .catch(console.error);
}

// to check logged in or not, and when user changes, it operates
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 1. when logged in
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// to check whether the user is admin or not
async function adminUser(user) {
  // 2. check whether the user is admin or not
  // 3. {...user, isAmin: true/false}
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        // console.log(admins);
        const isAdmin = admins.includes(user.uid); // check the user is in the amind list
        return { ...user, isAdmin }; // isAdmin: isAdmin(true/false)
      }
      return user; // if key(snapshot) 'admins' not exists in the database, just return original user
    });
}

export async function addNewProduct(product, imageURL) {
  const id = uuid();

  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageURL,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // key is id. we need values from the database
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

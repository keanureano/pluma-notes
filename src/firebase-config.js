import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd50RLL_l1nQHWmHtMyUWXBYusPD_8RpU",
  authDomain: "pluma-notes.firebaseapp.com",
  projectId: "pluma-notes",
  storageBucket: "pluma-notes.appspot.com",
  messagingSenderId: "956891218246",
  appId: "1:956891218246:web:46f937ceae6493c2b9e547",
  measurementId: "G-S9GX9QNYFL",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// use emulator
//connectFirestoreEmulator(db, "localhost", 8080);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const loginUser = () => signInWithPopup(auth, provider);
const logoutUser = () => signOut(auth);

export { db, auth, loginUser, logoutUser };

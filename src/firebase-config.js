import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export const db = getFirestore(app);

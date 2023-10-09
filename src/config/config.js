import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9okevj1SZLhsGF5o0y7DQIJctlMWf5_o",
  authDomain: "divine-actor-401115.firebaseapp.com",
  projectId: "divine-actor-401115",
  storageBucket: "divine-actor-401115.appspot.com",
  messagingSenderId: "839029334431",
  appId: "1:839029334431:web:6db90333d843987e701daa"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth, provider };

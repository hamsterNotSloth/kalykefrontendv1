import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCzXH10ja7j_rpBMHbrKZC0s7s6diFAS5E",
  authDomain: "kalyke-7c066.firebaseapp.com",
  projectId: "kalyke-7c066",
  storageBucket: "kalyke-7c066.appspot.com",
  messagingSenderId: "263033152993",
  appId: "1:263033152993:web:ca776219243fd9ed64dea0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

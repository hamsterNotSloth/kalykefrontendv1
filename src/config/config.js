import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";


const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
const auth_domain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const project_id = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storage_bucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messenger_sender_id = process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID;
const app_id = process.env.REACT_APP_FIREBASE_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENTID
const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messenger_sender_id,
  appId: app_id,
  measurementId: measurementId
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth, provider, app };

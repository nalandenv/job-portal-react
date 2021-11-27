import { initializeApp } from "firebase/app";
const {
    VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_DOMAIN, 
    VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE,
    VITE_FIREBASE_SENDER_ID, 
    VITE_FIREBASE_APP_ID} = import.meta.env;

// Your web app's Firebase configuration
const firebaseConfig:any = {
  apiKey:    VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE,
  messagingSenderId: VITE_FIREBASE_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

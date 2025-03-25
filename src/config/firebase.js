
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8Wc1u_k3SueRRM6d4podpLICyBW4F8vY",
  authDomain: "expense-tracker-eb1bb.firebaseapp.com",
  projectId: "expense-tracker-eb1bb",
  storageBucket: "expense-tracker-eb1bb.firebasestorage.app",
  messagingSenderId: "905329188969",
  appId: "1:905329188969:web:fa4672fb7cc89f524842f8",
  measurementId: "G-6XFP2BFCYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)


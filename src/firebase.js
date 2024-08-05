// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyApMpJ5h1iJ6R43I-J65cw9TqHm_Vqgrfs",
    authDomain: "expense-explorer-73310.firebaseapp.com",
    projectId: "expense-explorer-73310",
    storageBucket: "expense-explorer-73310.appspot.com",
    messagingSenderId: "149085468234",
    appId: "1:149085468234:web:8224d50810f0836b2dd8b3",
    measurementId: "G-WCDNPXPFP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc }


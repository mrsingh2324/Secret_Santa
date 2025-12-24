import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE these values with your own from the Firebase Console Project Settings.
const firebaseConfig = {
  apiKey: "AIzaSyCjgEjxZINFQ6FeKOj6BUx2oAJLZB_WWYA",
  authDomain: "secretsanta-c1437.firebaseapp.com",
  projectId: "secretsanta-c1437",
  storageBucket: "secretsanta-c1437.firebasestorage.app",
  messagingSenderId: "550618235596",
  appId: "1:550618235596:web:cfa8812e6c816fc9313869",
  measurementId: "G-1YCNMTTGDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

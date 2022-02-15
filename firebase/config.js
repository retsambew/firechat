import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQWkoHzmoUcyBZ513a-gu_9CChlvlJAsk",
  authDomain: "firechat-c7805.firebaseapp.com",
  projectId: "firechat-c7805",
  storageBucket: "firechat-c7805.appspot.com",
  messagingSenderId: "230486148132",
  appId: "1:230486148132:web:80377f1e1c1da657fdc4b1"
};

// Initialize Firebase
export const fireapp = initializeApp(firebaseConfig);
export const db = getFirestore(fireapp);

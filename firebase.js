import { initializeApp } from "firebase/app";
import { getFirestore , collection} from "firebase/firestore";

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

export let currentUser;
export const changeUser = (user) => currentUser=user;

export const Users = collection(db,'users');
export const msgDB = collection(db,'messageDB');
//const friends = collection(db,`users/${currentUser.id}/friends`);

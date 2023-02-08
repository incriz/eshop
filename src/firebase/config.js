import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8QGvp2KKk3VM3qffogWXCEQWWT4sfckk",
  authDomain: "eshop-b85a7.firebaseapp.com",
  projectId: "eshop-b85a7",
  storageBucket: "eshop-b85a7.appspot.com",
  messagingSenderId: "100368023883",
  appId: "1:100368023883:web:32aeeacfcec3387ebee8ce",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

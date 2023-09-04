// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg1VnzqseMEbMgSZBnaMh2N-E7LPNtS0M",
  authDomain: "blogsumar2.firebaseapp.com",
  projectId: "blogsumar2",
  storageBucket: "blogsumar2.appspot.com",
  messagingSenderId: "163671498366",
  appId: "1:163671498366:web:f3e71d08adf0201743022f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth , db , storage };
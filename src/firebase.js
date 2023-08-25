// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtSmZl9jUxF03qQNbF0PbJC97ObaRocPU",
  authDomain: "podcast-react-c5d84.firebaseapp.com",
  projectId: "podcast-react-c5d84",
  storageBucket: "podcast-react-c5d84.appspot.com",
  messagingSenderId: "242341596731",
  appId: "1:242341596731:web:48ac676b2d7bc40cdd161e",
  measurementId: "G-6GDG3W0DNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {auth, db, storage}
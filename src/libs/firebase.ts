// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyBXKv0eNfVeYR3YRb8BNfSo94Mgzey4Scg",
  authDomain: "file-upload-8e603.firebaseapp.com",
  projectId: "file-upload-8e603",
  storageBucket: "file-upload-8e603.appspot.com",
  messagingSenderId: "427006095034",
  appId: "1:427006095034:web:61627412ab1fb9bf78dc83",
});

// Initialize Firebase
export const storage = getStorage(app);

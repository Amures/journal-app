// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvLfiqdZk999RFvMAxD0C88wJUX_U0X50",
  authDomain: "react-cursos-bc483.firebaseapp.com",
  projectId: "react-cursos-bc483",
  storageBucket: "react-cursos-bc483.appspot.com",
  messagingSenderId: "223942259188",
  appId: "1:223942259188:web:4765c8d4abba5d67e149a1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
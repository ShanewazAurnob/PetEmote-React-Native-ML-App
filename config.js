import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_eVMhVLM7hEKxIKKrT_d8uE7v0hACPWg",
    authDomain: "petemotes-25000.firebaseapp.com",
    projectId: "petemotes-25000",
    storageBucket: "petemotes-25000.appspot.com",
    messagingSenderId: "186190763405",
    appId: "1:186190763405:web:39c2795474090949e519c4",
    measurementId: "G-QG3461X0T4"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  export { auth, firestore };
 
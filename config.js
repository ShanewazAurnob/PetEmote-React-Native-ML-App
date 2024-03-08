// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// import { getAuth, initializeAuth, getReactNativePersistance } from "firebase/auth";

// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyA_eVMhVLM7hEKxIKKrT_d8uE7v0hACPWg",
//     authDomain: "petemotes-25000.firebaseapp.com",
//     projectId: "petemotes-25000",
//     storageBucket: "petemotes-25000.appspot.com",
//     messagingSenderId: "186190763405",
//     appId: "1:186190763405:web:39c2795474090949e519c4",
//     measurementId: "G-QG3461X0T4"
//   };
//   const app = initializeApp(firebaseConfig);
//   // const auth = initializeAuth(app, {
//   //   persistance: getReactNativePersistance(AsyncStorage),
//   // }); 
//   const auth = getAuth(app);
//   const firestore = getFirestore(app);
  
//   export { auth, firestore };
 




import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage here

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(app);

export { app, auth, firestore };


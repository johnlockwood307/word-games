// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB2n0ATGRsh9TK1rgb2swSWZBDGfGhOF8",
  authDomain: "word-game-solvers.firebaseapp.com",
  projectId: "word-game-solvers",
  storageBucket: "word-game-solvers.firebasestorage.app",
  messagingSenderId: "729595614987",
  appId: "1:729595614987:web:d3db97d4ba66ec35e2740e",
  measurementId: "G-9Y8KKXHYC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
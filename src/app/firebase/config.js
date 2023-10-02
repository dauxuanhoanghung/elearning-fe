// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVpyw-XhbAK0QlljwF9c2vYci4G2iEbnk",
  authDomain: "chat-app-demo-v1.firebaseapp.com",
  projectId: "chat-app-demo-v1",
  storageBucket: "chat-app-demo-v1.appspot.com",
  messagingSenderId: "537151075232",
  appId: "1:537151075232:web:b6a1620a44fee190706ac5",
  measurementId: "G-DJ2XDT1QMP"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { db };
export default firebase;
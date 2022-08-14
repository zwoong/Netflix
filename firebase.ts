// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7Q6ZH1xINPzQ0if7cqdlDL0LYYDdLMOA",
  authDomain: "netflix-clone-706e2.firebaseapp.com",
  projectId: "netflix-clone-706e2",
  storageBucket: "netflix-clone-706e2.appspot.com",
  messagingSenderId: "488859484155",
  appId: "1:488859484155:web:dabe142a21bb928011555e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDKgYRzkhQ9_zaV8dF4-HGnlmm7mN01pq0",
  authDomain: "ausadhi-20da1.firebaseapp.com",
  projectId: "ausadhi-20da1",
  storageBucket: "ausadhi-20da1.firebasestorage.app",
  messagingSenderId: "617589187602",
  appId: "1:617589187602:web:6eaebd553683d7a89be4cb",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

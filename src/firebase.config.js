import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase config here
    apiKey: "AIzaSyAugr7ylMMXKs2zO7_uKCnCPG2CuYpZQgM",
  authDomain: "shannytech-shop-20672.firebaseapp.com",
  projectId: "shannytech-shop-20672",
  storageBucket: "shannytech-shop-20672.appspot.com",
  messagingSenderId: "392251891795",
  appId: "1:392251891795:web:14999a35de883976bd26a6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, auth, googleProvider, db, storage };
export default app;

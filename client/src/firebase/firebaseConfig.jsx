// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ee014.firebaseapp.com",
  projectId: "mern-blog-ee014",
  storageBucket: "mern-blog-ee014.appspot.com",
  messagingSenderId: "697782031122",
  appId: "1:697782031122:web:dde3b40aaedcf2eb2659cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth };

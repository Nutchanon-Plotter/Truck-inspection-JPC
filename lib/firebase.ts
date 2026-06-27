// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZdFvUahV9qVBMZOtEoHqbW2xHKD83g0I",
  authDomain: "truck-inspection-e1c63.firebaseapp.com",
  projectId: "truck-inspection-e1c63",
  storageBucket: "truck-inspection-e1c63.firebasestorage.app",
  messagingSenderId: "197388325166",
  appId: "1:197388325166:web:25aa138cad393cb2ac6abf"
};

// ป้องกันการ Initialize ซ้ำซ้อนเวลา Next.js ทำการ Hot Reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
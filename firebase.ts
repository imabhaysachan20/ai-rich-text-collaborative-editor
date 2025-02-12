import { initializeApp,getApps,getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCT4sG0ZwG_nPb0HjKg_NB4E3LihhiZP2Q",
    authDomain: "ai-rich-text-editor.firebaseapp.com",
    projectId: "ai-rich-text-editor",
    storageBucket: "ai-rich-text-editor.firebasestorage.app",
    messagingSenderId: "386728740049",
    appId: "1:386728740049:web:dbdf7d0c71d3689086f1f0",
    measurementId: "G-9T16RSTZ1D"
  };

  const app = getApps().length===0?initializeApp(firebaseConfig):getApp();
  const db = getFirestore(app);
  export default db;
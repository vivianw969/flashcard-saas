import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAh7-zd7e-TysiKhIr2noVMViWjN6OWW7E",
    authDomain: "flashcard-saas-33641.firebaseapp.com",
    projectId: "flashcard-saas-33641",
    storageBucket: "flashcard-saas-33641.appspot.com",
    messagingSenderId: "690203997722",
    appId: "1:690203997722:web:67510fac6a1735a91b03a3",
    measurementId: "G-LWQYKP6HVP"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
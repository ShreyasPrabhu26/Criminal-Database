import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAIZjyt4pcb3s6UzKciaB4wnbN8nizk_yA",
    authDomain: "criminaldatabase-59f4c.firebaseapp.com",
    projectId: "criminaldatabase-59f4c",
    storageBucket: "criminaldatabase-59f4c.appspot.com",
    messagingSenderId: "104472593863",
    appId: "1:104472593863:web:1c44fd54ba1424681285e2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

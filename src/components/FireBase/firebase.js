
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAQYjyWTdo-9ypTxOtuVN_t0XcYdMaRB60",
    authDomain: "upload-img-76277.firebaseapp.com",
    projectId: "upload-img-76277",
    storageBucket: "upload-img-76277.appspot.com",
    messagingSenderId: "380225679259",
    appId: "1:380225679259:web:1dd8f573f98ee60ffe3b3e",
    measurementId: "G-8ZF78LKW4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
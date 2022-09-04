import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4X5y3E9x9DdnS5pySuWtWIoJGt3w-2q8",
    authDomain: "natifjob-9634d.firebaseapp.com",
    projectId: "natifjob-9634d",
    storageBucket: "natifjob-9634d.appspot.com",
    messagingSenderId: "381654340315",
    appId: "1:381654340315:web:d2d3bca902427060ab32fe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

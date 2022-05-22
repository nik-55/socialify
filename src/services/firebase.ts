import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, set, ref, onValue } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAQ8qv_wq-1rWWse9tfVx0cmOPmGo9cVps",
    authDomain: "socialify-ea33a.firebaseapp.com",
    projectId: "socialify-ea33a",
    storageBucket: "socialify-ea33a.appspot.com",
    messagingSenderId: "863454389027",
    appId: "1:863454389027:web:60b7690c993bca4a79a296"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, set, ref, onValue, database }
import firebase from 'firebase';
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL} from "@env";
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

export const FIREBASE_CONFIG = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: 'expo-react-bunny',
    // storageBucket: 'production-a9404.appspot.com',
    // messagingSenderId: '525472070731',
    appId: FIREBASE_APP_ID,
    measurementId: 'G-measurement-id',
};
try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
} catch (err) {
    console.error(err)
    // ignore app already initialized error on snack
}

export {firebase};

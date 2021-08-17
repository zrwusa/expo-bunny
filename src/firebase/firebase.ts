import firebase from 'firebase/app';
import {
    FIREBASE_APP_ID_ANDROID,
    FIREBASE_APP_ID_IOS,
    FIREBASE_APP_ID_WEB,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    GOOGLE_API_KEY
} from '@env';
import {Platform} from 'react-native';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
// Optionally import the services that you want to use

export const FIREBASE_CONFIG = {
    apiKey: GOOGLE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: Platform.select({
        ios: FIREBASE_APP_ID_IOS,
        android: FIREBASE_APP_ID_ANDROID,
        web: FIREBASE_APP_ID_WEB
    }),
    measurementId: FIREBASE_MEASUREMENT_ID,
};

try {
    if (FIREBASE_CONFIG.apiKey) {
        firebase.initializeApp(FIREBASE_CONFIG);
        // // Initialize Cloud Firestore through Firebase
        // firebase.firestore();
    }
} catch (err) {
    console.error(err)
    // ignore app already initialized error on snack
}

export {firebase};


// Initialize Firebase & Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz1maAS_zbbhGOcFDladYW0AjuVr6yF-w",
  authDomain: "task-manager-app-8213a.firebaseapp.com",
  projectId: "task-manager-app-8213a",
  storageBucket: "task-manager-app-8213a.appspot.com",
  messagingSenderId: "93862937477",
  appId: "1:93862937477:web:c90bd32fde2d72197dbaec",
  measurementId: "G-LN7XZKQ0Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();


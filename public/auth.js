// auth.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up new users
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in existing users
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign out users
export function logOut() {
  return signOut(auth);
}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

// Register User
export const registerUser = async (email, password) => {
  // Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Save user details in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
};

// Login User
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

// Logout User
export const logoutUser = async () => {
  await signOut(auth);
};
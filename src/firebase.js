import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAQvbcvI2NEl0w_yWS9_Wlk_sCNixdjWI",
  authDomain: "collaborative-editor-f7d8b.firebaseapp.com",
  projectId: "collaborative-editor-f7d8b",
  storageBucket: "collaborative-editor-f7d8b.firebasestorage.app",
  messagingSenderId: "528748854781",
  appId: "1:528748854781:web:30fdaad7ed37b59776ed94",
  measurementId: "G-P0G31WS7FQ"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app;
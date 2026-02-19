// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPe0Zp69bnM9251w0FfnH1UPhGedGh4qo",
  authDomain: "novus-9dfb8.firebaseapp.com",
  projectId: "novus-9dfb8",
  storageBucket: "novus-9dfb8.appspot.com",
  messagingSenderId: "641276518161",
  appId: "1:641276518161:web:ee2c11e2662e86e59bb6b0"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

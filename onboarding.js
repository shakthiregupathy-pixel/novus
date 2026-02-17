// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
// 🔴 Replace with YOUR Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// ================= INITIALIZE =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= SAVE ONBOARDING DATA =================
async function saveOnboardingData() {
  const data = {
    name: document.getElementById("name").value,
    employeeId: document.getElementById("employeeId").value,
    role: document.getElementById("role").value,
    startDate: document.getElementById("startDate").value,
    mentor: document.getElementById("mentor").value,
    mode: document.getElementById("mode").value,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "onboardingUsers"), data);
    alert("✅ Onboarding data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
    alert("❌ Error saving data");
  }
}

// ================= BUTTON / AUTO SAVE =================
// Save data when dashboard opens
window.saveOnboardingData = saveOnboardingData;

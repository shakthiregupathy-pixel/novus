// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyDPe0Zp69bnM9251w0FfnH1UPhGedGh4qo",
  authDomain: "novus-9dfb8.firebaseapp.com",
  projectId: "novus-9dfb8"
};


// ================= INITIALIZE =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
document.addEventListener("DOMContentLoaded", function () {

  const name = sessionStorage.getItem("loggedInName");
  const empId = sessionStorage.getItem("loggedInEmpId");

  if(name){
    document.getElementById("name").value = name;
  }

  if(empId){
    document.getElementById("employeeId").value = empId;
  }

});// ================= SAVE ONBOARDING DATA =================
window.saveOnboardingData = async function () {

  // 👉 READ VALUES AFTER USER TYPES
  const name = document.getElementById("name").value;
  const employeeId = document.getElementById("employeeId").value;
  const role = document.getElementById("role").value;
  const startDate = document.getElementById("startDate").value;
  const mentor = document.getElementById("mentor").value;
  const mode = document.getElementById("mode").value;

  // 👉 SIMPLE VALIDATION
  if (!name || !employeeId || !mentor || !startDate) {
    alert("❌ Please fill all fields");
    return;
  }

  const data = {
    name,
    employeeId,
    role,
    startDate,
    mentor,
    mode,
    createdAt: new Date()
  };

  try {
   await addDoc(collection(db, "users"), data);
    alert("✅ Onboarding data saved successfully!");
  } catch (error) {
    console.error(error);
    alert("❌ Error saving data");
  }
};

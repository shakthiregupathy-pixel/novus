import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let score = 5;
let totalQuestions = 10;
async function submitQuiz() {
  // 1️⃣ Calculate score
  const percentage = Math.round((score / totalQuestions) * 100);

  // 2️⃣ Update UI
  document.getElementById("quizScore").innerText =
    percentage + " / 100";

  // 3️⃣ 🔥 STEP 7 — SAVE TO FIREBASE (HERE ONLY)
  await setDoc(
    doc(db, "progress", "user_001"),
    {
      quizScore: percentage,
      quizCompleted: true,
      updatedAt: new Date()
    },
    { merge: true }
  );

  alert("Quiz submitted & saved!");
}
async function submitCoding(score) {
  await setDoc(
    doc(db, "progress", "user_001"),
    {
      codingScore: score,
      codingCompleted: true
    },
    { merge: true }
  );
}
async function submitAssignment(score) {
  await setDoc(
    doc(db, "progress", "user_001"),
    {
      assignmentScore: score,
      assignmentCompleted: true
    },
    { merge: true }
  );
}
const snap = await getDoc(doc(db, "progress", "user_001"));

if (snap.exists()) {
  const data = snap.data();

  document.getElementById("quizProgress").innerText =
    data.quizScore + "%";

  document.getElementById("codingProgress").innerText =
    data.codingScore + "%";
}

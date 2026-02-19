import { auth } from "./firebase.js";
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userId = user.uid;
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const data = snap.data();

  // 🔹 UPDATE QUIZ SCORE
  document.getElementById("quizScore").innerText =
    `${data.assessment.quizScore} / 100`;

  // 🔹 UPDATE CODING PROGRESS
  document.getElementById("codingProgressText").innerText =
    `${data.assessment.codingProgress}%`;

  document.getElementById("codingProgressBar").style.width =
    `${data.assessment.codingProgress}%`;

  // 🔹 UPDATE OVERALL PROGRESS
  document.getElementById("overallProgress").innerText =
    `${data.assessment.overallScore}%`;

});
import { db, auth } from "./firebase.js";
import { doc, updateDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function submitQuiz(score){
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    "assessment.quizScore": score,
    "assessment.updatedAt": new Date()
  });
}


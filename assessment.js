import { auth, db } from "./firebase.js";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
auth.onAuthStateChanged((user) => {
  if (!user) return;

  const userId = user.uid;
});
async function saveQuizScore(score) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    "assessment.quizScore": score,
    "assessment.updatedAt": serverTimestamp()
  });
}
async function saveCodingProgress(progress) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    "assessment.codingProgress": progress,
    "assessment.updatedAt": serverTimestamp()
  });
}
async function submitAssignment() {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    "assessment.assignmentSubmitted": true,
    "assessment.updatedAt": serverTimestamp()
  });
}
async function updateOverallScore() {
  const user = auth.currentUser;
  if (!user) return;

  const quiz = 85;     // from UI
  const coding = 60;   // from UI

  const overall = Math.round((quiz + coding) / 2);

  await updateDoc(doc(db, "users", user.uid), {
    "assessment.overallScore": overall
  });
}
async function checkCertificationEligibility() {
  const user = auth.currentUser;
  if (!user) return;

  const eligible = true; // based on rules

  await updateDoc(doc(db, "users", user.uid), {
    "certification.eligible": eligible
  });
}
saveQuizScore(85);
saveCodingProgress(60);

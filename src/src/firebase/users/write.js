import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";

export const createUser = async ({ uid, user }) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      user: { ...user },
      createdAt: Timestamp.now(),
    },
    {
      merge: true,
    }
  );
};

export const insertUserResume = async ({ uid, data }) => {
  if (!data) {
    throw new Error("No Data for Insert in DB {insertUserResume}fn");
  }
  await setDoc(
    doc(db, `users/${uid}`),
    {
      resume: data,
      createdAt: Timestamp.now(),
    },
    {
      merge: true,
    }
  );
};

export const insertUserResumeReview = async ({ uid, data }) => {
  if (!data) {
    throw new Error("No Data for Insert in DB {insertUserResumeReview}");
  }
  await setDoc(
    doc(db, `users/${uid}`),
    {
      resume_review: data,
      createdAt: Timestamp.now(),
    },
    { merge: true }
  );
};
export const insertJobSuggestions = async ({ uid, data }) => {
  if (!data) {
    throw new Error("No Data for Insert in DB {insertJobSuggestions}");
  }
  await setDoc(
    doc(db, `users/${uid}`),
    {
      job_suggestions: data,
      createdAt: Timestamp.now(),
    },
    { merge: true }
  );
};

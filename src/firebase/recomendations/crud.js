// firebase/recommendations/crud.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config";

// Save career recommendations for a user
export const setRecommendation = async ({ uid, recommendations }) => {
  try {
    const docRef = doc(db, `users/${uid}/recommendations/career`);
    await setDoc(docRef, {
      ...recommendations,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error saving recommendations:", error);
    throw new Error("Failed to save recommendations");
  }
};

// Get career recommendations for a user
export const getRecommendation = async ({ uid }) => {
  try {
    const docRef = doc(db, `users/${uid}/recommendations/career`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to fetch recommendations");
  }
};

// Delete career recommendations for a user (optional)
export const deleteRecommendation = async ({ uid }) => {
  try {
    const docRef = doc(db, `users/${uid}/recommendations/career`);
    await setDoc(docRef, {});
    return true;
  } catch (error) {
    console.error("Error deleting recommendations:", error);
    throw new Error("Failed to delete recommendations");
  }
};
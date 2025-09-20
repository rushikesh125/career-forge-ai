// firebase/skillsuggestions/crud.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config";

// Save skill suggestions for a user
export const setSkillSuggestion = async ({ uid, skillSuggestion }) => {
  try {
    const docRef = doc(db, `users/${uid}/skillsuggestions/latest`);
    await setDoc(docRef, {
      ...skillSuggestion,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error saving skill suggestions:", error);
    throw new Error("Failed to save skill suggestions");
  }
};

// Get skill suggestions for a user
export const getSkillSuggestion = async ({ uid }) => {
  try {
    const docRef = doc(db, `users/${uid}/skillsuggestions/latest`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching skill suggestions:", error);
    throw new Error("Failed to fetch skill suggestions");
  }
};

// Delete skill suggestions for a user (optional)
export const deleteSkillSuggestion = async ({ uid }) => {
  try {
    const docRef = doc(db, `users/${uid}/skillsuggestions/latest`);
    await setDoc(docRef, {});
    return true;
  } catch (error) {
    console.error("Error deleting skill suggestions:", error);
    throw new Error("Failed to delete skill suggestions");
  }
};
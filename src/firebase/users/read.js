import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

export const getResume = async ({ uid }) => {
  const res = await getDoc(doc(db, `users/${uid}`));
  if (await res.exists()) {
    return res.data()?.resume;
  } else {
    return null;
  }
};


export const getResumeReview = async ({uid})=>{
  const res = await getDoc(doc(db,`users/${uid}`));
  if(await res.exists()){
    return res.data()?.resume_review;
  }else{
    return null;
  }
}
export const getJobSuggestions = async ({uid})=>{
  const res = await getDoc(doc(db,`users/${uid}`));
  if(await res.exists()){
    return res.data()?.job_suggestions;
  }else{
    return null;
  }
}
export const getJDanalysis = async ({uid})=>{
  const res = await getDoc(doc(db,`users/${uid}`));
  if(await res.exists()){
    return res.data()?.resume_jd_analysis;
  }else{
    return null;
  }
}
export const getATSAnalysis = async ({uid})=>{
  const res = await getDoc(doc(db,`users/${uid}`));
  if(await res.exists()){
    return res.data()?.ats_analysis;
  }else{
    return null;
  }
}
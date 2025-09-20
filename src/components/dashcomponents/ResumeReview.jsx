import React, { useEffect, useState } from "react";
import CustomBtn from "../CustomBtn";
import toast from "react-hot-toast";
import { ReviewResume } from "@/app/model/resumeReview";
import ResumeReviewDisplay from "./ResumeReviewDisplay";
import { insertUserResumeReview } from "@/firebase/users/write";
import { useSelector } from "react-redux";
import { ShieldAlert } from "lucide-react";
import { getResumeReview } from "@/firebase/users/read";

const ResumeReview = ({ data }) => {
  const [resumeReview, setResumeReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state=>state.user)
  useEffect(()=>{
    (async()=>{
      try {
        const rr = await getResumeReview({uid:user?.uid});
      // console.log('rr',rr);
      if(rr){
        setResumeReview(rr)
        console.log(JSON.stringify(rr))
      }
      } catch (error) {
        toast.error("failed to get ResumeReview")
      }
    })();
  },[user])

  const handleGenerateReview = async () => {
    setIsLoading(true);
    try {
      // console.log(data);
      if(data){
        const res = await ReviewResume(data)
        console.log('res::',res);
        const aiReview = JSON.parse(await res)
        console.log(aiReview?.resume_review);
        if(user?.uid){
          await insertUserResumeReview({uid:user?.uid,data:aiReview?.resume_review})
        }
        toast.success("Review & suggestion Generated")
        if(aiReview?.resume_review){
          setResumeReview(aiReview?.resume_review)
          
        }
      }
    } catch (error) {
      toast.error("Error Generating Resume Review & Suggestion")
      console.log('Error ===>>>',error);
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <>
    {resumeReview && <ResumeReviewDisplay reviewData={resumeReview}/>}
      
      {!resumeReview && <div className="w-full p-2 text-center justify-center border border-dashed border-red-500 text-red-500 dark:border-red-100 rounded-lg my-3 flex dark:text-red-200"><ShieldAlert/> No Review & Suggestions Found , <br/>Generate Review & Suggestion with Ai 👇👇</div>}
      <CustomBtn
      onClick={handleGenerateReview}
        isLoading={isLoading}
        className={`my-2 py-1 px-2 rounded-full border bg-purple-200 dark:bg-transparent border-purple-400 mx-auto`}
      >
        ✨{resumeReview ? "ReGenerate Ai Based Review & Suggestion":"Generate Ai Based Review & Suggestion"}
      </CustomBtn>
    </>
  );
};

export default ResumeReview;

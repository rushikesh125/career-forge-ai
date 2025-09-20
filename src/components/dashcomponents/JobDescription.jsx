"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import CustomBtn from "../CustomBtn";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CircularLoader from "@/app/loading";
import { getJDanalysis, getResume } from "@/firebase/users/read";
import { ResumeNJdAnalysis } from "@/app/model/ResJDCompare";
import { insertResJdComparison } from "@/firebase/users/write";
import JdAnalysis from "./JdAnalysis";

export default function JobDescriptionInput() {
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [JDanalysis, setJDanalysis] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const user = useSelector((state) => state.user);
  //   https://forge-ai-api.vercel.app/api/resumetext

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getResume({ uid: user?.uid });
        setResumeData(res);
        console.log(JSON.stringify(res));
      } catch (error) {
        console.log("error", error);
        toast.error(error);
        setError(
          "roadmap is not generated please generate roadmap form assessment"
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  useEffect(()=>{
    (async()=>{
      try {
        const jd_read = await getJDanalysis({uid:user?.uid});
      console.log('jdddd',jd_read);
      if(jd_read){
        setJDanalysis(jd_read)
        // console.log(JSON.stringify(jd_read))
      }
      } catch (error) {
        toast.error("failed to get ResumeReview")
      }
    })();
  },[user])

  const clearFile = () => {
    setJobDescription("");
    setStatus(null);
    setError(null);
  };

  const handleResumeNJdComparison = async () => {
    if (!resumeData) {
      throw new Error("No Resume Data Found!");
    }
    if (!jobDescription) {
      throw new Error("No Job Description Found");
    }
    try {
      setIsLoading(true);

      const res = await ResumeNJdAnalysis(resumeData, jobDescription);
      const jd_temp = JSON.parse(await res)
      setJDanalysis(jd_temp)
      //   console.log(res);
      try {
        await insertResJdComparison({ uid: user?.uid, data: jd_temp });
        toast.success("Job Description Analysis Created Successfully");
      } catch (error) {
        toast.error(error?.message);
        console.log("error", error);
      }
    } catch (error) {
      toast.error("Error::", error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  //   if(isLoading){
  //     return <CircularLoader/>
  //   }
  return (
    <>
    <div className="bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Job Description{" "}
        {resumeData && (
          <span className="text-green-600">Resume Data is Available ✅</span>
        )}
      </h2>

      {/* Text Area */}
      {!resumeData && (
        <div className="text-red-500">Please Upload Resume First </div>
      )}
      {resumeData && (
        <textarea
          className="w-full h-40 p-2 rounded-lg bg-gray-100 outline-none dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Paste the job description here "
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      )}
      {/* Compare Button */}
      <CustomBtn
        onClick={handleResumeNJdComparison}
        className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 flex items-center justify-center"
        isLoading={isLoading}
      >
        Compare Resume with Job Description
      </CustomBtn>
      <hr />
    </div>
      {JDanalysis && <JdAnalysis data={JDanalysis}/>}
    </>
  );
}

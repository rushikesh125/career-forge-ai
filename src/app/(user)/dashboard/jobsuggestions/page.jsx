"use client";
import { jobSuggestion } from "@/app/model/jobSuggestion";
import CustomBtn from "@/components/CustomBtn";
import JobSuggestionsDisplay from "@/components/dashcomponents/JobSuggestionsDisplay";
import { Button } from "@/components/ui/button";
import { getJobSuggestions, getResume } from "@/firebase/users/read";
import { insertJobSuggestions } from "@/firebase/users/write";
import { CogIcon, Loader2, ShieldAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const JobSuggestions = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      const rr = await getResume({ uid: user?.uid });
      console.log("rr", rr);
      if (rr) {
        setResumeData(rr);
      }
    })();
    (async () => {
      const rr = await getJobSuggestions({ uid: user?.uid });
      console.log("rr", rr);
      if (rr) {
        setSuggestions(rr);
      }
    })();
  }, [user]);

  const handleGenerateJobSuggestion = async () => {
    setIsLoading(true);
    try {
      // console.log(data);
      if (resumeData) {
        console.log("clicked");
        const res = await jobSuggestion(resumeData);
        console.log("res::", res);
        const aiSuggestion = JSON.parse(await res);
        console.log(aiSuggestion);
        if (user?.uid && aiSuggestion) {
          await insertJobSuggestions({ uid: user?.uid, data: aiSuggestion });
        }
        toast.success("Review & suggestion Generated");
        if (aiSuggestion) {
          setSuggestions(aiSuggestion);
        }
      }
    } catch (error) {
      toast.error("Error Generating Job Suggestions");
      console.log("Error ===>>>", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <main className="pt-20 p-4 relative text-gray-800 dark:text-white">
        {suggestions && <JobSuggestionsDisplay data={suggestions} />}
        {!suggestions && (
          <div className="w-full p-2 text-center justify-center border border-dashed border-red-500 text-red-500 dark:border-red-100 rounded-lg my-3 flex dark:text-red-200">
            <ShieldAlert /> No Job Suggestions Found , <br />
            Generate Job Suggestions with Ai 👇👇
          </div>
        )}
        <div className="w-full border flex justify-center">
          <Button
            onClick={handleGenerateJobSuggestion}
            disabled={isLoading}
            className={`border bg-purple-700 dark:bg-transparent border-purple-400 mx-atuo`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <CogIcon />}

            {isLoading ? "Generating..." : "Generate Job Suggestions"}
          </Button>
        </div>
      </main>
    </>
  );
};

export default JobSuggestions;

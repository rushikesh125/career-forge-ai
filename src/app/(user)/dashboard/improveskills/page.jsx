// components/ImproveSkills.jsx
"use client";
import { GenerateSkillsSuggestion } from "@/app/model/skillsuggestion";
import CustomBtn from "@/components/CustomBtn";
import SkillRecommendations from "@/components/dashcomponents/SkillSuggestion";
import { getResume } from "@/firebase/users/read";
import { getSkillSuggestion, setSkillSuggestion } from "@/firebase/skillsuggestions/crud";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const ImproveSkills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [skillSuggestion, setSkillSuggestionState] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        // Fetch resume data
        const rr = await getResume({ uid: user?.uid });
        console.log("rr", rr);
        if (rr) {
          setResumeData(rr);
        }

        // Fetch existing skill suggestions
        try {
          const existingSuggestions = await getSkillSuggestion({ uid: user?.uid });
          if (existingSuggestions) {
            setSkillSuggestionState(existingSuggestions);
          }
        } catch (error) {
          console.log("No existing skill suggestions found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    })();
  }, [user]);

  const handleGenerateSkillSuggestion = async () => {
    setIsLoading(true);
    try {
      if (!resumeData) {
        throw new Error("No Resume Data Found");
      }
      
      const res = await GenerateSkillsSuggestion(resumeData);
      console.log('res', res);
      const skill_suggestion_temp = JSON.parse(await res);
      
      // Save to Firebase
      try {
        await setSkillSuggestion({
          uid: user?.uid,
          skillSuggestion: skill_suggestion_temp
        });
        toast.success("Skill suggestions saved successfully");
      } catch (saveError) {
        console.error("Error saving suggestions:", saveError);
        toast.error("Failed to save suggestions");
      }
      
      setSkillSuggestionState(skill_suggestion_temp);
    } catch (error) {
      console.error("Error generating skill suggestions:", error);
      toast.error(error?.message || "Failed to generate skill suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="pt-20 p-4 text-gray-800 dark:text-white">
        <div className=" mx-auto">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  bg-clip-text text-transparent py-2 border-b-2 border-dashed border-purple-500 ">
            Suggestion To Improve Skills
          </h2>
          <div className="w-full flex justify-center">
            <Button
            disabled={isLoading}
            onClick={handleGenerateSkillSuggestion}
            className={`border border-violet-500 rounded-full px-4 py-1 mx-auto my-3`}
          >
            {isLoading?<Loader className="animate-spin"/>:""}
            {isLoading?"Generating...":"✨ Suggest  Skills Improvement"}
            
          </Button>
          </div>
          
          {skillSuggestion && <SkillRecommendations skillData={skillSuggestion} />}
        </div>
      </main>
    </>
  );
};

export default ImproveSkills;
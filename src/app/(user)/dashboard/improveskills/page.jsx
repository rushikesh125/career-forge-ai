"use client";
import { GenerateSkillsSuggestion } from "@/app/model/skillsuggestion";
import CustomBtn from "@/components/CustomBtn";
import SkillRecommendations from "@/components/dashcomponents/SkillSuggestion";
import { getResume } from "@/firebase/users/read";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ImproveSkills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [skillSuggestion,setSkillSuggestion] = useState(null)
  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const rr = await getResume({ uid: user?.uid });
      console.log("rr", rr);
      if (rr) {
        setResumeData(rr);
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
      console.log('res',res);
      const skill_suggestion_tem = JSON.parse(await res)
      setSkillSuggestion(skill_suggestion_tem)
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="pt-20 p-4 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  bg-clip-text text-transparent py-2 border-b-2 border-dashed border-purple-500 ">
            Suggestion To Improve Skills
          </h2>
          <CustomBtn
            isLoading={isLoading}
            onClick={handleGenerateSkillSuggestion}
            className={`border border-violet-500 rounded-full px-4 py-1 mx-auto my-3`}
          >
            ✨ Suggest Ai Based Skills Improvement
          </CustomBtn>
          {skillSuggestion && <SkillRecommendations  skillData={skillSuggestion}/>}
        </div>
      </main>
    </>
  );
};

export default ImproveSkills;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Progress } from '@/components/ui/progress';
// import { BookOpen, Code, DollarSign, Clock, Award, Users, Laptop } from 'lucide-react';

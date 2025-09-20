// components/CareerRecommendations.jsx
"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Book,
  Briefcase,
  TrendingUp,
  Heart,
  Clock,
  Globe,
  AlertTriangle,
  Award,
  Sparkles,
  Target,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  RefreshCw,
} from "lucide-react";

import { getRecommendation, setRecommendation } from "@/firebase/recomendations/crud";
import { getResume } from "@/firebase/users/read";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import Link from "next/link";
import confetti from "canvas-confetti";
import generateCareerPath from "@/app/AiModels/careerRecommendationModel";

const CareerRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [careerInterest, setCareerInterest] = useState("");
  const user = useSelector((state) => state?.user);

  // Access the nested career_recommendations object
  const recommendations = data?.career_recommendations || data;
  const [expandedPrimary, setExpandedPrimary] = useState(0);
  const [expandedSecondary, setExpandedSecondary] = useState(null);
  const [expandedSubfield, setExpandedSubfield] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Fetch resume data
        const rr = await getResume({ uid: user?.uid });
        if (rr) {
          setResumeData(rr);
          // Set default career interest from resume if available
          if (rr.careerInterest) {
            setCareerInterest(rr.careerInterest);
          }
        }

        // Fetch existing recommendations
        try {
          const res = await getRecommendation({ uid: user?.uid });
          if (res) {
            setData(res);
          }
        } catch (error) {
          console.log("No existing recommendations found");
        }
      } catch (error) {
        console.log("error", error);
        toast.error(error.message || "An error occurred");
        setError("Unable to load data. Please try again.");
      }
    })();
  }, [user]);

  const handleGenerateRoadMap = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (resumeData) {
        // Append career interest to resume data
        const resumeWithInterest = {
          ...resumeData,
          careerInterest: careerInterest || "Not specified"
        };

        const res = await generateCareerPath({
          resumeData: resumeWithInterest,
        });
        const aiResponse = JSON.parse(await res);
        console.log("AI :RES:", JSON.stringify(aiResponse))
        
        if (user?.uid && aiResponse) {
          const result = await setRecommendation({
            uid: user?.uid,
            recommendations: aiResponse,
          });
          
          if (result) {
            toast.success("Career Roadmap Generated Successfully");
            setData(aiResponse);
            confetti();
          }
        }
      } else {
        throw new Error("No resume data available");
      }
    } catch (err) {
      console.error("Error generating career path:", err);
      toast.error("Failed to Generate Roadmap. Try Again");
      setError("Failed to generate roadmap. Please check your resume data and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getColorByScore = (score) => {
    const percentage = score;
    if (percentage >= 80) return "bg-purple-500 text-white dark:bg-purple-600 dark:text-white";
    if (percentage >= 60) return "bg-purple-400 text-white dark:bg-purple-500 dark:text-white";
    if (percentage >= 40) return "bg-purple-300 text-purple-900 dark:bg-purple-700 dark:text-purple-100";
    return "bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100";
  };

  const SkillBadge = ({ skill, technologies, proficiencyLevel }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-purple-100 dark:border-gray-700 shadow-sm mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-purple-800 dark:text-purple-200 text-lg">{skill}</span>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            proficiencyLevel === "Advanced"
              ? "bg-purple-500 text-white dark:bg-purple-600 dark:text-white"
              : proficiencyLevel === "Intermediate"
              ? "bg-purple-400 text-white dark:bg-purple-500 dark:text-white"
              : "bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100"
          }`}
        >
          {proficiencyLevel}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {technologies.map((tech, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm bg-purple-50 dark:bg-gray-700 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-gray-600 rounded-full px-3 py-1 text-center">
              {tech}
            </span>
           
          </div>
        ))}
      </div>
    </div>
  );

  const CareerPathCard = ({
    careerPath,
    isExpanded,
    toggleExpanded,
    isPrimary,
    index,
  }) => (
    <div
      className={`mb-6 rounded-2xl shadow-lg border border-purple-200 dark:border-gray-700 overflow-hidden ${
        isPrimary ? "bg-purple-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div
        className={`p-6 cursor-pointer flex justify-between items-center ${
          isPrimary
            ? "bg-purple-600 text-white dark:bg-purple-700 dark:text-gray-100"
            : "bg-purple-500 text-white dark:bg-purple-600 dark:text-gray-100"
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <Briefcase className="mr-3" size={24} />
          <h2 className="text-xl font-semibold">{careerPath.name || careerPath.career}</h2>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${getColorByScore(
              careerPath.score || careerPath.matchScore
            )}`}
          >
            {Math.round(careerPath.score || careerPath.matchScore)}% Match
          </span>
          {isExpanded ? (
            <ChevronUp size={24} />
          ) : (
            <ChevronDown size={24} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 bg-white dark:bg-gray-900">
          <div className="mb-6">
            <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-2 flex items-center">
              <Sparkles className="mr-2" /> Why This Matches You
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {careerPath.why || careerPath.reasonForMatch}
            </p>
          </div>

          {careerPath.companies && (
            <div className="mb-6">
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-3 flex items-center">
                <Users className="mr-2" /> Top Companies Hiring
              </h3>
              <div className="flex flex-wrap gap-2">
                {careerPath.companies.map((company, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}

          {careerPath.skills && (
            <div className="mb-6">
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-3 flex items-center">
                <Target className="mr-2" /> Key Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {careerPath.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {careerPath.roles && (
            <div className="mb-6">
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-3 flex items-center">
                <GraduationCap className="mr-2" /> Career Roles & Salary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerPath.roles.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-700"
                  >
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                      {role.title}
                    </h4>
                    <div className="flex items-center mt-2 text-purple-600 dark:text-purple-400">
                      <DollarSign size={16} className="mr-1" />
                      <span>{role.salary}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {careerPath.industryOutlook && (
            <div className="mb-6 bg-purple-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-4 flex items-center">
                <TrendingUp className="mr-2" /> Industry Outlook
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-purple-100 dark:border-gray-700">
                  <span className="text-purple-600 dark:text-purple-400 font-medium block mb-1">
                    Growth Rate
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {careerPath.industryOutlook.growthRate}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-purple-100 dark:border-gray-700">
                  <span className="text-purple-600 dark:text-purple-400 font-medium block mb-1">
                    Market Demand
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {careerPath.industryOutlook.marketDemand}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-purple-100 dark:border-gray-700">
                  <span className="text-purple-600 dark:text-purple-400 font-medium block mb-1">
                    Future Prospects
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {careerPath.industryOutlook.futureProspects}
                  </span>
                </div>
              </div>
              {careerPath.industryOutlook.topRecruiters && (
                <>
                  <h4 className="text-purple-700 dark:text-purple-400 font-medium mb-3">Top Recruiters</h4>
                  {careerPath.industryOutlook.topRecruiters?.map((recruiter, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-purple-100 dark:border-gray-700 mb-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600 dark:text-purple-400 font-medium">
                          {recruiter.type}
                        </span>
                        <span className="text-purple-800 dark:text-purple-300 font-medium">
                          {recruiter.averagePackage}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {recruiter.companies?.map((company, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-200 text-xs px-3 py-1 rounded-full"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {careerPath.subFields && (
            <div>
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-4">
                Specialized Sub-fields
              </h3>
              {careerPath.subFields?.map((subfield, index) => (
                <div
                  key={index}
                  className="border border-purple-200 dark:border-gray-700 rounded-xl mb-3 overflow-hidden"
                >
                  <div
                    className="bg-purple-100 dark:bg-gray-800 p-4 flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setExpandedSubfield(
                        expandedSubfield === `${index}-${careerPath.name || careerPath.career}-${index}`
                          ? null
                          : `${index}-${careerPath.name || careerPath.career}-${index}`
                      )
                    }
                  >
                    <h4 className="font-medium text-purple-900 dark:text-purple-200 text-lg">
                      {subfield.name}
                    </h4>
                    {expandedSubfield === `${index}-${careerPath.name || careerPath.career}-${index}` ? (
                      <ChevronUp size={20} className="text-purple-700 dark:text-purple-400" />
                    ) : (
                      <ChevronDown size={20} className="text-purple-700 dark:text-purple-400" />
                    )}
                  </div>

                  {expandedSubfield === `${index}-${careerPath.name || careerPath.career}-${index}` && (
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {subfield.description}
                      </p>

                      {subfield.currentTrends && (
                        <div className="mb-4">
                          <h5 className="text-purple-700 dark:text-purple-400 font-medium mb-2 flex items-center">
                            <TrendingUp size={16} className="mr-1" /> Current Trends
                          </h5>
                          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                            {subfield.currentTrends?.map((trend, idx) => (
                              <li key={idx}>{trend}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {subfield.requiredSkills && (
                        <div className="mb-4">
                          <h5 className="text-purple-700 dark:text-purple-400 font-medium mb-2">
                            Required Skills
                          </h5>
                          {subfield.requiredSkills?.technical && (
                            <div className="mb-4">
                              <h6 className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                                Technical Skills
                              </h6>
                              {subfield.requiredSkills?.technical?.map((skill, idx) => (
                                <SkillBadge key={idx} {...skill} />
                              ))}
                            </div>
                          )}
                          {subfield.requiredSkills?.soft && (
                            <div>
                              <h6 className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                                Soft Skills
                              </h6>
                              <div className="flex flex-wrap gap-2">
                                {subfield.requiredSkills?.soft?.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {subfield.preparationResources?.courses && (
                        <div>
                          <h5 className="text-purple-700 dark:text-purple-400 font-medium mb-2 flex items-center">
                            <Book size={16} className="mr-1" /> Recommended Courses
                          </h5>
                          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                            {subfield.preparationResources?.courses?.map(
                              (course, idx) => (
                                <li key={idx}>{course.name}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const AdditionalInsightsSection = () => {
    if (!recommendations?.additionalInsights) return null;

    return (
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-purple-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-purple-600 dark:bg-purple-700 text-white dark:text-gray-100">
          <h2 className="text-xl font-semibold flex items-center">
            <Award className="mr-3" /> Additional Career Insights
          </h2>
        </div>
        <div className="p-6">
          {recommendations.additionalInsights.careerProgression && (
            <div className="mb-8">
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-4">
                Career Progression
              </h3>
              <div className="space-y-6">
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 flex items-start gap-4">
                  <span className="bg-purple-600 dark:bg-purple-700 text-white dark:text-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    1
                  </span>
                  <div>
                    <h4 className="text-purple-700 dark:text-purple-400 font-medium text-lg">
                      Year 1: {recommendations.additionalInsights.careerProgression.year1?.role || "Entry Level Role"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year1?.focus || "Skill development"}
                    </p>
                    <p className="text-purple-800 dark:text-purple-300 font-medium mt-1">
                      {recommendations.additionalInsights.careerProgression.year1?.expectedPackage || "Competitive package"}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 flex items-start gap-4">
                  <span className="bg-purple-700 dark:bg-purple-800 text-white dark:text-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    3
                  </span>
                  <div>
                    <h4 className="text-purple-700 dark:text-purple-400 font-medium text-lg">
                      Year 3: {recommendations.additionalInsights.careerProgression.year3?.role || "Mid Level Role"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year3?.focus || "Leadership development"}
                    </p>
                    <p className="text-purple-800 dark:text-purple-300 font-medium mt-1">
                      {recommendations.additionalInsights.careerProgression.year3?.expectedPackage || "Senior package"}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 flex items-start gap-4">
                  <span className="bg-purple-800 dark:bg-purple-900 text-white dark:text-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    5
                  </span>
                  <div>
                    <h4 className="text-purple-700 dark:text-purple-400 font-medium text-lg">
                      Year 5: {recommendations.additionalInsights.careerProgression.year5?.role || "Senior Leadership"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Focus:</span> {recommendations.additionalInsights.careerProgression.year5?.focus || "Strategic leadership"}
                    </p>
                    <p className="text-purple-800 dark:text-purple-300 font-medium mt-1">
                      {recommendations.additionalInsights.careerProgression.year5?.expectedPackage || "Executive package"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recommendations.additionalInsights.workLifeBalance && (
            <div>
              <h3 className="text-purple-800 dark:text-purple-300 font-semibold text-lg mb-4 flex items-center">
                <Heart className="mr-2" /> Work-Life Balance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 text-center">
                  <Clock className="text-purple-600 dark:text-purple-400 mx-auto mb-2" size={28} />
                  <h4 className="text-purple-700 dark:text-purple-400 font-medium text-sm mb-1">
                    Average Work Hours
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {recommendations.additionalInsights.workLifeBalance.averageWorkHours || "40-45 hours/week"}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 text-center">
                  <Globe className="text-purple-600 dark:text-purple-400 mx-auto mb-2" size={28} />
                  <h4 className="text-purple-700 dark:text-purple-400 font-medium text-sm mb-1">
                    Remote Opportunities
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {recommendations.additionalInsights.workLifeBalance.remoteOpportunities || "High"}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-xl border border-purple-100 dark:border-gray-700 text-center">
                  <AlertTriangle className="text-purple-600 dark:text-purple-400 mx-auto mb-2" size={28} />
                  <h4 className="text-purple-700 dark:text-purple-400 font-medium text-sm mb-1">
                    Stress Level
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {recommendations.additionalInsights.workLifeBalance.stressLevel || "Moderate"}
                  </p>
                </div>
              </div>
              {recommendations.additionalInsights.workLifeBalance.tips && (
                <div>
                  <h4 className="text-purple-700 dark:text-purple-400 font-medium mb-2">Tips for Balance</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    {recommendations.additionalInsights.workLifeBalance.tips?.map(
                      (tip, index) => (
                        <li key={index}>{tip}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Career Interest Section - Always Visible */}
      <div className="mb-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-purple-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-purple-600 dark:bg-purple-700 text-white dark:text-gray-100">
          <h2 className="text-xl font-semibold flex items-center">
            <Target className="mr-3" /> Career Interest
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tell us about your career interests to get personalized recommendations:
          </p>
          <textarea
            value={careerInterest}
            onChange={(e) => setCareerInterest(e.target.value)}
            placeholder="e.g., I'm interested in data science and machine learning, particularly in the healthcare industry..."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGenerateRoadMap}
              disabled={isLoading || !resumeData}
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2" size={16} />
                  {recommendations ? "Regenerate Recommendations" : "Generate Recommendations"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading indicator below the form */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 dark:border-purple-400 mr-3"></div>
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Generating your personalized career recommendations...
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-8 mb-8">
          <AlertTriangle size={48} className="text-red-400 dark:text-red-300 mx-auto mb-4" />
          <p className="text-red-400 dark:text-red-300 text-2xl font-medium">{error}</p>
        </div>
      )}

      {recommendations && !isLoading && (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-3">
              Your Career Recommendations
            </h1>
            <p className="text-purple-600 dark:text-purple-400 text-lg max-w-2xl mx-auto">
              Based on your resume and career interests, here are personalized career paths for you.
            </p>
          </div>

          <div>
            {recommendations.primaryCareerPaths && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 mb-6 flex items-center justify-center">
                  <Award className="mr-2 text-purple-600 dark:text-purple-400" /> Primary Career Recommendations
                </h2>
                {recommendations.primaryCareerPaths?.map((career, index) => (
                  <CareerPathCard
                    key={index}
                    careerPath={career}
                    isExpanded={expandedPrimary === index}
                    toggleExpanded={() =>
                      setExpandedPrimary(expandedPrimary === index ? null : index)
                    }
                    isPrimary={true}
                    index={index}
                  />
                ))}
              </div>
            )}

            {recommendations.secondaryCareerPaths && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 mb-6 flex items-center justify-center">
                  <Briefcase className="mr-2 text-purple-600 dark:text-purple-400" /> Alternative Career Options
                </h2>
                {recommendations.secondaryCareerPaths?.map((career, index) => (
                  <CareerPathCard
                    key={index}
                    careerPath={career}
                    isExpanded={expandedSecondary === index}
                    toggleExpanded={() =>
                      setExpandedSecondary(expandedSecondary === index ? null : index)
                    }
                    isPrimary={false}
                    index={index}
                  />
                ))}
              </div>
            )}

            <AdditionalInsightsSection />
          </div>
        </>
      )}

      {!recommendations && !isLoading && (
        <div className="text-center py-12">
          <AlertTriangle size={48} className="text-red-400 dark:text-red-300 mx-auto mb-4" />
          <p className="text-red-400 dark:text-red-300 text-2xl font-medium mb-4">
            No Career Recommendations Found
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Enter your career interests above and click "Generate Recommendations" to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations;
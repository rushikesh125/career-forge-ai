import React from "react";
import { motion } from "framer-motion";
import {
  AwardIcon,
  BookOpenCheckIcon,
  Brain,
  Clock,
  Cloud,
  DollarSignIcon,
  GraduationCapIcon,
  Users2Icon,
  ExternalLink,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/TabsComponents";
import Link from "next/link";

const SkillCard = ({ skill, index }) => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
  };

  const getSkillIcon = (skillName) => {
    const iconClass = "w-6 h-6";
    switch (skillName) {
      case "Cloud Computing":
        return <Cloud className={iconClass} />;
      case "Artificial Intelligence/Machine Learning":
        return <Brain className={iconClass} />;
      default:
        return <GraduationCapIcon className={iconClass} />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 p-3 rounded-xl text-white flex-shrink-0">
          {getSkillIcon(skill.skill)}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                {skill.skill}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{skill.expected_time_to_master}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getDifficultyColor(skill.difficulty)}`}>
              {skill.difficulty}
            </span>
          </div>

          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
            {skill.description}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <DollarSignIcon className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {skill.average_salary}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Users2Icon className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                Career Roles
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.career_roles?.map((role, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs md:text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="learning_path" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <TabsTrigger
              value="learning_path"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-violet-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md text-sm"
            >
              Learning Path
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-violet-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md text-sm"
            >
              Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning_path" className="mt-4 space-y-4">
            {Object.entries(skill.learning_path || {}).map(([phase, content], i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpenCheckIcon className="w-4 h-4 text-purple-500" />
                  {content.title}
                </h3>
                <div className="mt-3 space-y-2">
                  {content.topics?.map((topic, j) => (
                    <div
                      key={j}
                      className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="courses" className="mt-4 space-y-4">
            {skill.courses?.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <AwardIcon className="w-4 h-4 text-purple-500" />
                  {course.title}
                </h3>
                <div className="mt-3 space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Provider:</span>
                    <span>{course.provider}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Format:</span>
                    <span>{course.format}</span>
                  </div>
                  {course.link && (
                    <Link 
                      href={course.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                    >
                      View Course
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

const SkillRecommendations = ({ skillData }) => {
  const recommendations = skillData?.recommendations || [];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
        Recommended Skills
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Personalized skill recommendations to boost your career growth
      </p>
    </motion.div>
    
    {recommendations.length > 0 ? (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {recommendations.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </motion.div>
    ) : (
      <div className="text-center py-12">
        <div className="bg-gray-200 dark:bg-gray-800 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          No Recommendations Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          We couldn't generate skill recommendations at this time. Try again later.
        </p>
      </div>
    )}
  </div>
</div>
  );
};

export default SkillRecommendations;
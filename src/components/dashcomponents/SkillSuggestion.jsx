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
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/TabsComponents";
import Link from "next/link";

const SkillCard = ({ skill }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getSkillIcon = (skillName) => {
    switch (skillName) {
      case "Cloud Computing":
        return <Cloud className="w-8 h-8" />;
      case "Artificial Intelligence/Machine Learning":
        return <Brain className="w-8 h-8" />;
      default:
        return <GraduationCapIcon className="w-8 h-8" />;
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="backdrop-blur-xl bg-white/10 dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/20 dark:border-gray-700/30"
    >
      <motion.div variants={item} className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 p-2 rounded-lg text-white">
            {getSkillIcon(skill.skill)}
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              {skill.skill}
            </h2>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
              <Clock className="w-4 h-4" />
              <span>{skill.expected_time_to_master}</span>
            </div>
          </div>
        </div>
        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 font-medium">
          {skill.difficulty}
        </span>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-4 text-gray-600 dark:text-gray-300"
      >
        {skill.description}
      </motion.p>

      <motion.div variants={item} className="mt-6 flex items-center gap-2">
        <DollarSignIcon className="w-5 h-5 text-green-500" />
        <span className="text-gray-700 dark:text-gray-200">
          {skill.average_salary}
        </span>
      </motion.div>

      <motion.div variants={item} className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Users2Icon className="w-5 h-5 text-purple-500" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Career Roles
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skill.career_roles.map((role, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 text-sm"
            >
              {role}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="mt-6">
        <Tabs defaultValue="learning_path" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-1">
            <TabsTrigger
              value="learning_path"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-violet-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md"
            >
              Learning Path
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:via-violet-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md"
            >
              Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning_path" className="mt-4 space-y-4">
            {Object.entries(skill.learning_path).map(([phase, content], i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 dark:bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm"
              >
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpenCheckIcon className="w-4 h-4 text-purple-500" />
                  {content.title}
                </h3>
                <div className="mt-2 space-y-2">
                  {content.topics.map((topic, j) => (
                    <div
                      key={j}
                      className="text-gray-600 dark:text-gray-300 ml-6"
                    >
                      • {topic}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="courses" className="mt-4 space-y-4">
            {skill.courses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 dark:bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm"
              >
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <AwardIcon className="w-4 h-4 text-purple-500" />
                  {course.title}
                </h3>
                <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 ml-6">
                  <div>Provider: {course.provider}</div>
                  <div>Duration: {course.duration}</div>
                  <div>Format: {course.format}</div>
                  <Link href={`${course.link}`} className="px-2 py-1 my-4 rounded-md border border-purple-500 hover:bg-purple-600">View Course</Link>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

const SkillRecommendations = ({ skillData }) => {
  const recommendations = skillData?.recommendations || [];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent"
        >
          Recommended Skills
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.length > 0 ? (
            recommendations.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No skill recommendations available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillRecommendations;
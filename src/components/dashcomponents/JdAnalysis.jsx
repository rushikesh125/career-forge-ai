import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AwardIcon, BookAIcon, BriefcaseBusiness, MailCheckIcon, MapPinCheck, Phone, Star, StarIcon } from 'lucide-react';
import { IconBrandLinkedin } from '@tabler/icons-react';

const JdAnalysis = ({ data }) => {
  const {
    candidate_info,
    job_description,
    match_evaluation,
    overall_match_percentage,
    recommendation
  } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width:` ${width}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-2">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section with Glass Effect */}
        <motion.div 
          variants={itemVariants}
          className="text-center p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border border-white/20 shadow-xl"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Talent Match Analysis
          </h1>
          <div className="flex justify-center items-center gap-8">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <motion.circle
                  className="text-transparent stroke-purple-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="url(#gradient)"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: overall_match_percentage / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                />
                  <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              </svg>
            
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  {overall_match_percentage}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Candidate Profile Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      {candidate_info?.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                  {candidate_info?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                  >
                    <MapPinCheck className="h-5 w-5 text-purple-500" />
                    <span>{candidate_info?.location}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                  >
                    <BookAIcon className="h-5 w-5 text-violet-500" />
                    <span>{candidate_info.degree}</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                  >
                    <BriefcaseBusiness className="h-5 w-5 text-pink-500" />
                    <span>{candidate_info.experience_years} years experience</span>
                  </motion.div>
                </div>
                <div className="pt-4 space-y-2">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={`mailto:${candidate_info.email}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <MailCheckIcon className="h-4 w-4" />
                    <span>{candidate_info.email}</span>
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={`tel:${candidate_info.phone}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{candidate_info.phone}</span>
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={candidate_info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <IconBrandLinkedin className="h-4 w-4" />
                    <span>LinkedIn Profile</span>
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Match Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <StarIcon className="h-6 w-6 text-purple-500" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(match_evaluation).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    className="space-y-2"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 capitalize font-medium">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                        {(value.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 rounded-full"
                        custom={value.score * 100}
                        variants={progressVariants}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendation Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-12"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                  <AwardIcon className="h-6 w-6 text-purple-500" />
                  Final Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-pink-500/10 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Star className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      {recommendation.fit_category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {recommendation.suggestions.map((suggestion, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        {suggestion}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JdAnalysis;
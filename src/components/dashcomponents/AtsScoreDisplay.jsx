import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AwardIcon, BadgeCheckIcon, Briefcase, GraduationCapIcon, LineChartIcon, Users2Icon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Progress } from '../ui/ProgressComponent';

const AtsScoreDisplay = ({ data }) => {
  const { resume_analysis } = data;

  return (
    <div className="min-h-screen w-full p-6 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          Resume Analysis Dashboard
        </h1>
        <p className="text-xl dark:text-gray-300 text-gray-600">
          {resume_analysis.candidate_name} - {resume_analysis.experience_level}
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users2Icon className="h-6 w-6 text-violet-500" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="dark:text-gray-300 text-gray-600">
            {resume_analysis?.summary}
          </CardContent>
        </Card>
      </motion.div>

      {/* Job Suggestions Section */}
      <Tabs defaultValue="job1" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {resume_analysis?.suggested_jobs.map((job, index) => (
            <TabsTrigger key={index} value={`job${index + 1}`} className="min-w-fit">
              {job?.job_title}
            </TabsTrigger>
          ))}
        </TabsList>

        {resume_analysis?.suggested_jobs.map((job, index) => (
          <TabsContent key={index} value={`job${index + 1}`} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Job Details */}
              <Card className="border dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-violet-500" />
                    Role Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="dark:text-gray-300 text-gray-600">{job.job_description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job?.skills_matched?.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-full text-sm bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics */}
              <Card className="border dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-6 w-6 text-violet-500" />
                    Job Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm dark:text-gray-300">Overall Fit</span>
                        <span className="text-sm font-medium">{job.overall_fit_score}%</span>
                      </div>
                      <Progress value={job?.overall_fit_score} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm dark:text-gray-300">Work-Life Balance</span>
                        <span className="text-sm font-medium">{job.work_life_balance}/10</span>
                      </div>
                      <Progress value={job.work_life_balance * 10} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm dark:text-gray-300">Growth Opportunities</span>
                        <span className="text-sm font-medium">{job.growth_opportunities}/10</span>
                      </div>
                      <Progress value={job.growth_opportunities * 10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Salary and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AwardIcon className="h-6 w-6 text-violet-500" />
                    Required Skills & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 dark:text-gray-300">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills_and_gaps.required_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 dark:text-gray-300">Skills to Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.required_skills_and_gaps.missing_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BadgeCheckIcon className="h-6 w-6 text-violet-500" />
                    Salary & Work Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-300">USA:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{job.average_salary.USA}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-300">India:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{job.average_salary.India}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-300">Work Type:</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                        {job.remote_or_onsite}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="dark:text-gray-300">Market Demand:</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200">
                        {job.job_market_demand}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Recommendations */}
      <Card className="border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCapIcon className="h-6 w-6 text-violet-500" />
            Career Development Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {resume_analysis.additional_recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 dark:text-gray-300"
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-violet-500" />
                {rec}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AtsScoreDisplay;
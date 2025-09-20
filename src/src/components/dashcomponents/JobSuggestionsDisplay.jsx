import React from 'react';
import { 
  Briefcase, 
  Star, 
  ArrowUp, 
  Building, 
  BarChart, 
  Certificate,
  Award,
  CheckCircle,
  XCircle,
  Globe,
  DollarSign,
  Sparkles,
  LucideAward,
  BriefcaseBusiness,
  StarIcon,
  DollarSignIcon,
  Building2,
  BarChart2,
  CheckCircle2,
  XCircleIcon
} from 'lucide-react';
import { IconCertificate } from '@tabler/icons-react';

const JobSuggestionsDisplay = ({ data }) => {
  const { resume_analysis } = data;

  return (
    <div className="w-full max-w-4xl mx-auto p-2 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          {resume_analysis.candidate_name}
        </h1>
        <div className="flex items-center gap-2 text-lg">
          <LucideAward className="w-5 h-5 text-violet-500 dark:text-violet-400" />
          <span className="font-medium">{resume_analysis.experience_level}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{resume_analysis.summary}</p>
      </div>

      {/* Job Recommendations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          Recommended Positions
        </h2>
        
        {resume_analysis.suggested_jobs?.map((job, index) => (
          <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4 bg-white dark:bg-gray-800">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                  <h3 className="text-xl font-semibold">{job.job_title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{job.job_description}</p>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold">{job.overall_fit_score}%</span>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Salary Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Salary Ranges</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>USA: {job.average_salary?.USA}</p>
                  <p>India: {job.average_salary?.India}</p>
                </div>
              </div>

              {/* Work Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Work Arrangement</span>
                </div>
                <div className="space-y-1">
                  <p>{job.remote_or_onsite}</p>
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-purple-500" />
                    <span>Market Demand: {job.job_market_demand}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Matching Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills_matched.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <XCircleIcon className="w-4 h-4 text-red-500" />
                  <span className="font-medium">Skills to Develop</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.required_skills_and_gaps.missing_skills?.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconCertificate className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Recommended Certifications</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {job.certifications_needed.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>

              {/* Ratings */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Opportunity Metrics</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-32">Work-Life Balance:</div>
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < job.work_life_balance ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32">Growth Potential:</div>
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < job.growth_opportunities ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Recommendations */}
      <div className="space-y-4 bg-white border border-gray-200 dark:border-none dark:bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold  bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          Development Recommendations
        </h2>
        <div className="space-y-2">
          {resume_analysis.additional_recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 p-2">
              <ArrowUp className="w-5 h-5 text-violet-500 dark:text-violet-400 mt-1" />
              <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSuggestionsDisplay;
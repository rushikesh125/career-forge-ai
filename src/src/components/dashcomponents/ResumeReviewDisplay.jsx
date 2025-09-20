import React from "react";
import {
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Gauge,
  ArrowUpRight,
  ChevronRight,
  GaugeCircle,
  StarsIcon,
  ChevronUpCircle,
  LightbulbIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  LineChartIcon,
  CheckCircle,
} from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   HalfCard,
// } from "./ResumeDashboard";
import RatingCircle from "../RatingCircle";

// const ResumeReviewDisplay = ({ reviewData }) => {
//   const {
//     overall_rating,
//     general_feedback,
//     strengths,
//     improvements,
//     final_verdict,
//   } = reviewData;

//   return (
//     <div className="max-w-4xl mx-auto p-2 space-y-6 ">
//       {/* Header Section */}
//       <div className="space-y-4 dark:bg-gray-800 rounded-lg p-2">
//         <div className="flex flex-col-reverse md:flex-row items-center justify-evenly gap-4 ">
//           <div className="">
            
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//             <GaugeCircle className="w-8 h-8 text-purple-500 inline-block" /> Resume Review Score
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               Expected after improvements: {final_verdict.improved_rating}/10
//             </p>
//           </div>
//           {overall_rating && <RatingCircle rating={overall_rating} />}
//         </div>
//       </div>

//       {/* General Feedback Card */}
//       <div className="w-full lg:flex gap-6">
//         <HalfCard className="border border-purple-200 dark:border-purple-900 dark:bg-gray-800">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <CheckCircle2 className="w-5 h-5 text-purple-500" />
//               <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//                 General Feedback
//               </span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-700 dark:text-gray-300">
//               {general_feedback}
//             </p>
//           </CardContent>
//         </HalfCard>

//         {/* Strengths Section */}
//         <HalfCard className="border border-purple-200 dark:border-purple-900 dark:bg-gray-800">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Star className="w-5 h-5 text-purple-500" />
//               <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//                 Key Strengths
//               </span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {strengths.map((strength, idx) => (
//                 <div key={idx} className="space-y-2">
//                   <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
//                     {strength.title}
//                   </h3>
//                   <ul className="space-y-2">
//                     {strength.points.map((point, pointIdx) => (
//                       <li key={pointIdx} className="flex items-start gap-2">
//                         <ChevronRight className="w-4 h-4 mt-1 text-purple-500 flex-shrink-0" />
//                         <span className="text-gray-700 dark:text-gray-300">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </HalfCard>
//       </div>

//       {/* Improvements Section */}
//       <Card className="border border-purple-200 dark:border-purple-900 dark:bg-gray-800">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-purple-500" />
//             <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//               Suggested Improvements
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {improvements.map((improvement, idx) => (
//               <div
//                 key={idx}
//                 className="space-y-3 pb-4 border-b border-purple-100 dark:border-purple-800 last:border-0"
//               >
//                 <div className="flex items-center gap-2">
//                   <AlertCircle className="w-5 h-5 text-purple-500" />
//                   <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
//                     {improvement.section}
//                   </h3>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 pl-7">
//                   {improvement.feedback}
//                 </p>
//                 <ul className="space-y-2 pl-7">
//                   {improvement.suggestions.map((suggestion, sugIdx) => (
//                     <li key={sugIdx} className="flex items-start gap-2">
//                       <ArrowUpRight className="w-4 h-4 mt-1 text-purple-500 flex-shrink-0" />
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {suggestion}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Final Verdict Section */}
//       <Card className="border border-purple-200 dark:border-purple-900 dark:bg-gray-800">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <CheckCircle2 className="w-5 h-5 text-purple-500" />
//             <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
//               Improvements to Apply
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-2">
//             {final_verdict.improvements_applied.map((improvement, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <ChevronRight className="w-4 h-4 mt-1 text-purple-500 flex-shrink-0" />
//                 <span className="text-gray-700 dark:text-gray-300">
//                   {improvement}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ResumeReviewDisplay;


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsComponents';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { CheckCircle, AlertCircle, ChevronUp, BadgeCheck, Lightbulb, ArrowUpRight, LineChart, Stars } from 'lucide-react';
import { Card, CardHeader, CardTitle ,CardContent,CardDescription} from "../ui/uiComponents";
import { Progress } from "../ui/ProgressComponent";

const ResumeReviewDisplay = ({ reviewData }) => {
  const {
    final_verdict,
    improvements,
    strengths,
    general_feedback,
    overall_rating
  } = reviewData;

  // Calculate improvement percentage
  const improvementPercentage = ((final_verdict.improved_rating - overall_rating) / overall_rating) * 100;

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 dark:text-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            Resume Review Dashboard
          </h1>
        </div>

        {/* Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="overflow-hidden dark:bg-gray-800 bg-white dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <StarsIcon className="mr-2 text-yellow-400" size={24} />
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  Resume Score
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm dark:text-gray-400 text-gray-500">Original Score</p>
                  <div className="flex items-end mt-1">
                    <span className="text-3xl font-bold">{overall_rating}</span>
                    <span className="text-lg ml-1">/10</span>
                  </div>
                  <Progress value={overall_rating * 10} className="h-2 mt-2" />
                </div>
                <div>
                  <p className="text-sm dark:text-gray-400 text-gray-500">Improved Score</p>
                  <div className="flex items-end mt-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                      {final_verdict.improved_rating}
                    </span>
                    <span className="text-lg ml-1">/10</span>
                  </div>
                  <Progress value={final_verdict.improved_rating * 10} className="h-2 mt-2 bg-gray-300 dark:bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500" 
                         style={{ width: `${final_verdict.improved_rating * 10}%` }}/>
                  </Progress>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <ChevronUpCircle className="text-green-500 mr-2" size={20} />
                <span className="text-green-500 font-medium">+{improvementPercentage.toFixed(1)}%</span>
                <span className="ml-2 dark:text-gray-400 text-gray-500">improvement with recommendations</span>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 bg-white dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <LightbulbIcon className="mr-2 text-yellow-400" size={24} />
                <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  Key Improvements Applied
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {final_verdict.improvements_applied.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <BadgeCheckIcon className="mr-2 text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="improvements" className="mt-8">
          <TabsList className="mb-6 dark:bg-gray-800 bg-gray-100">
            <TabsTrigger value="improvements" className="flex items-center">
              <AlertCircle className="mr-2" size={16} />
              Areas for Improvement
            </TabsTrigger>
            <TabsTrigger value="strengths" className="flex items-center">
              <CheckCircle2Icon className="mr-2" size={16} />
              Strengths
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center">
              <LineChartIcon className="mr-2" size={16} />
              Overall Feedback
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="improvements">
            <div className="grid grid-cols-1 gap-6">
              {improvements.map((item, index) => (
                <Card key={index} className="dark:bg-gray-800 bg-white dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                          {item.section}
                        </span>
                      </div>
                      <span className="text-sm px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-100">
                        {item.issue}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 dark:text-gray-300 text-gray-700">{item.feedback}</p>
                    
                    {item.example_improvement && (
                      <div className="rounded-lg p-4 mb-4 dark:bg-gray-700 bg-gray-100">
                        <h4 className="font-medium mb-2">{item.example_improvement.title || 'Example Improvement'}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs mb-1 dark:text-gray-400 text-gray-500">Before:</p>
                            <p className="dark:text-gray-300 text-gray-700">{item.example_improvement.before}</p>
                          </div>
                          <div>
                            <p className="text-xs mb-1 dark:text-gray-400 text-gray-500">After:</p>
                            <p className="font-medium text-green-500">{item.example_improvement.after}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Suggestions:</h4>
                      <ul className="space-y-2">
                        {item.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="flex items-start">
                            <ArrowUpRight className="mr-2 mt-1 flex-shrink-0 dark:text-purple-400 text-purple-600" size={16} />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="strengths">
            <Card className="dark:bg-gray-800 bg-white dark:border-gray-700">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  {strengths[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {strengths[0].points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-3 text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span className="dark:text-gray-300 text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="dark:bg-gray-800 bg-white dark:border-gray-700">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  General Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed dark:text-gray-300 text-gray-700">
                  {general_feedback}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeReviewDisplay;
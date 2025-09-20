"use client";

import CircularLoader from "@/app/loading";
import ResumeDashboard from "@/components/dashcomponents/ResumeDashboard";
import ResumeReview from "@/components/dashcomponents/ResumeReview";
import { getResume } from "@/firebase/users/read";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getResume({ uid: user?.uid });
        setResumeData(res);
        console.log(JSON.stringify(res));
      } catch (error) {
        console.log("error", error);
        toast.error(error);
        setError(
          "roadmap is not generated please generate roadmap form assessment"
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);
  const stats = [
    { label: "Total Users", value: "12,345", change: "+12%" },
    { label: "Revenue", value: "$45,678", change: "+8%" },
    { label: "Active Projects", value: "48", change: "+15%" },
    { label: "Conversion Rate", value: "2.4%", change: "+5%" },
  ];
  //   const resumeData = {
  //     "education": [
  //         {
  //             "degree": "Bachelor of Technology in Mechanical Engineering",
  //             "graduation": "2024",
  //             "school": "National Institute of Technology (NIT), Pune"
  //         }
  //     ],
  //     "personalInfo": {
  //         "name": "Amit Sharma",
  //         "email": "amitsharma@example.com",
  //         "phone": "+91 98765-12345",
  //         "portfolio": null
  //     },
  //     "skills": {
  //         "categories": [
  //             {
  //                 "category": "Design & Simulation",
  //                 "skills": [
  //                     "AutoCAD",
  //                     "SolidWorks",
  //                     "CATIA",
  //                     "ANSYS"
  //                 ]
  //             },
  //             {
  //                 "category": "Manufacturing",
  //                 "skills": [
  //                     "CNC Machining",
  //                     "Injection Molding",
  //                     "Lean Manufacturing"
  //                 ]
  //             },
  //             {
  //                 "category": "Thermal & Fluid Dynamics",
  //                 "skills": [
  //                     "CFD",
  //                     "Heat Transfer",
  //                     "Thermodynamics"
  //                 ]
  //             },
  //             {
  //                 "category": "Programming & Automation",
  //                 "skills": [
  //                     "MATLAB",
  //                     "Python",
  //                     "Arduino"
  //                 ]
  //             },
  //             {
  //                 "category": "Quality Control",
  //                 "skills": [
  //                     "Six Sigma",
  //                     "Failure Mode and Effects Analysis (FMEA)"
  //                 ]
  //             }
  //         ]
  //     },
  //     "summary": "Dedicated Mechanical Engineer with expertise in CAD design, manufacturing processes, and quality control. Strong analytical skills and hands-on experience in product design, automation, and prototyping.",
  //     "certifications": [
  //         "Six Sigma Green Belt (2024)",
  //         "AutoCAD & SolidWorks Certified Professional (2023)"
  //     ],
  //     "experience": [
  //         {
  //             "achievements": [
  //                 "Assisted in designing automotive components for fuel efficiency.",
  //                 "Conducted stress analysis for new prototypes.",
  //                 "Collaborated with the R&D team for electric vehicle projects."
  //             ],
  //             "company": "Tata Motors, Pune",
  //             "period": "Summer 2024",
  //             "title": "Mechanical Engineer Intern"
  //         }
  //     ],
  //     "extracurricular": [
  //         "Member, SAE India (Society of Automotive Engineers)",
  //         "Won Best Design Award in National Robotics Competition (2023)",
  //         "Volunteer for technical workshops in rural schools"
  //     ],
  //     "projects": [
  //         {
  //             "details": [
  //                 "Designed and optimized a conveyor system using SolidWorks and MATLAB.",
  //                 "Increased production efficiency by 25% through automation"
  //             ],
  //             "title": "Automated Conveyor Belt System"
  //         },
  //         {
  //             "details": [
  //                 "Developed an innovative cooling mechanism for EV batteries.",
  //                 "Conducted CFD analysis to optimize heat dissipation"
  //             ],
  //             "title": "Electric Vehicle Battery Cooling System"
  //         }
  //     ]
  // }
  if (isLoading) {
    return <CircularLoader />;
  }
  
  return (
    <main className="pt-20 p-4 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        {resumeData && <ResumeDashboard data={resumeData} />}
        {resumeData && <ResumeReview data={resumeData}/>}
        {!resumeData && (
          <div> No resume found , please upload resume first <Link href={`/resume`} className="text-blue-500">Go Here</Link> </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

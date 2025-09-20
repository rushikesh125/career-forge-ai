import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);


const JobDescriptionAnalysis =  {
    description: "Resume evaluation and job matching analysis",
    type: SchemaType.OBJECT,
    properties: {
      candidate_info: {
        type: SchemaType.OBJECT,
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "Full name of the candidate"
          },
          email: {
            type: SchemaType.STRING,
            description: "Email address of the candidate"
          },
          phone: {
            type: SchemaType.STRING,
            description: "Contact number of the candidate"
          },
          linkedin: {
            type: SchemaType.STRING,
            description: "LinkedIn profile URL"
          },
          portfolio: {
            type: SchemaType.STRING,
            description: "Personal portfolio website"
          },
          degree: {
            type: SchemaType.STRING,
            description: "Educational qualification"
          },
          experience_years: {
            type: SchemaType.NUMBER,
            description: "Years of professional experience"
          },
          current_role: {
            type: SchemaType.STRING,
            description: "Current job title"
          },
          location: {
            type: SchemaType.STRING,
            description: "Current location of the candidate"
          }
        },
        required: ["name", "email", "phone", "degree", "experience_years", "location"]
      },
      job_description: {
        type: SchemaType.OBJECT,
        properties: {
          title: {
            type: SchemaType.STRING,
            description: "Job position title"
          },
          location: {
            type: SchemaType.STRING,
            description: "Job location"
          },
          salary_range: {
            type: SchemaType.STRING,
            description: "Expected salary range"
          },
          experience_required: {
            type: SchemaType.STRING,
            description: "Required years of experience"
          },
          skills_required: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "List of required technical skills"
          },
          responsibilities: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Key job responsibilities"
          },
          work_style: {
            type: SchemaType.STRING,
            description: "Work arrangement type",
            enum: ["Remote", "Onsite", "Hybrid"]
          },
          certifications_preferred: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Preferred certifications"
          },
          required_languages: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Required languages"
          },
          preferred_qualifications: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Preferred educational qualifications"
          }
        },
        required: ["title", "location", "skills_required", "responsibilities", "work_style"]
      },
      match_evaluation: {
        type: SchemaType.OBJECT,
        properties: {
          technical_skills_match: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              max_score: { type: SchemaType.NUMBER },
              missing_skills: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              },
              matching_skills: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              }
            },
            required: ["score", "max_score", "missing_skills", "matching_skills"]
          },
          experience_match: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              max_score: { type: SchemaType.NUMBER },
              required_experience: { type: SchemaType.STRING },
              actual_experience: { type: SchemaType.STRING }
            },
            required: ["score", "max_score", "required_experience", "actual_experience"]
          },
          education_match: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              max_score: { type: SchemaType.NUMBER },
              required_degree: { type: SchemaType.STRING },
              actual_degree: { type: SchemaType.STRING }
            },
            required: ["score", "max_score", "required_degree", "actual_degree"]
          },
          soft_skills_match: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              max_score: { type: SchemaType.NUMBER },
              mentioned_soft_skills: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              },
              missing_soft_skills: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              }
            },
            required: ["score", "max_score", "mentioned_soft_skills", "missing_soft_skills"]
          },
          location_match: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              max_score: { type: SchemaType.NUMBER },
              job_location: { type: SchemaType.STRING },
              candidate_location: { type: SchemaType.STRING },
              willing_to_relocate: { type: SchemaType.BOOLEAN }
            },
            required: ["score", "max_score", "job_location", "candidate_location"]
          }
        },
        required: [
          "technical_skills_match",
          "experience_match",
          "education_match",
          "soft_skills_match",
          "location_match"
        ]
      },
      overall_match_percentage: {
        type: SchemaType.NUMBER,
        description: "Overall match percentage between candidate and job"
      },
      recommendation: {
        type: SchemaType.OBJECT,
        properties: {
          fit_category: {
            type: SchemaType.STRING,
            description: "Overall fit assessment",
            enum: ["Perfect Fit", "Good Fit", "Potential Fit", "Not a Fit"]
          },
          suggestions: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Improvement suggestions for the candidate"
          }
        },
        required: ["fit_category", "suggestions"]
      }
    },
    required: ["candidate_info", "job_description", "match_evaluation", "overall_match_percentage", "recommendation"]
  };

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: JobDescriptionAnalysis,
  },
});

// Example usage
const ResumeNJdAnalysis = async (resumeData,JDData) => {
  const resData = JSON.stringify(resumeData)
  const Jd_data = JSON.stringify(JDData)
  console.log(resData);
  
  try {
    const result = await model.generateContent(
      `Resume:- ${resData} & job Description ${Jd_data} understand this resume & Provided Job Description and Compare them on Given Different Parameters `
    );
    return result.response.text()
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { JobDescriptionAnalysis, ResumeNJdAnalysis };

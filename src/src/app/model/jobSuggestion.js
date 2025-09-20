import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);


const resumeAnalysisSchema = {
  description: "Resume analysis data structure",
  type: SchemaType.OBJECT,
  properties: {
    resume_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        candidate_name: {
          type: SchemaType.STRING,
          description: "Name of the candidate"
        },
        summary: {
          type: SchemaType.STRING,
          description: "Summary of candidate's profile and expertise"
        },
        experience_level: {
          type: SchemaType.STRING,
          description: "Experience level of the candidate",
          enum: ["Entry-Level", "Mid-Level", "Senior", "Lead", "Principal"]
        },
        suggested_jobs: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              job_title: {
                type: SchemaType.STRING,
                description: "Title of the suggested job"
              },
              job_description: {
                type: SchemaType.STRING,
                description: "Description of the job role"
              },
              skills_matched: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "List of skills that match the job requirements"
              },
              average_salary: {
                type: SchemaType.OBJECT,
                properties: {
                  USA: { type: SchemaType.STRING },
                  India: { type: SchemaType.STRING }
                },
                description: "Salary ranges in different regions",
                required: ["USA", "India"]
              },
              work_life_balance: {
                type: SchemaType.NUMBER,
                description: "Work-life balance rating out of 10"
              },
              growth_opportunities: {
                type: SchemaType.NUMBER,
                description: "Growth opportunities rating out of 10"
              },
              remote_or_onsite: {
                type: SchemaType.STRING,
                description: "Work arrangement type",
                enum: ["Remote", "Onsite", "Hybrid"]
              },
              job_market_demand: {
                type: SchemaType.STRING,
                description: "Current market demand for this role",
                enum: ["Low", "Medium", "Medium-High", "High"]
              },
              required_skills_and_gaps: {
                type: SchemaType.OBJECT,
                properties: {
                  required_skills: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                    description: "Skills required for the job"
                  },
                  missing_skills: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                    description: "Skills the candidate needs to acquire"
                  }
                },
                required: ["required_skills", "missing_skills"]
              },
              certifications_needed: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "Required certifications for the role"
              },
              overall_fit_score: {
                type: SchemaType.NUMBER,
                description: "Overall job fit score out of 100"
              }
            },
            required: [
              "job_title",
              "job_description",
              "skills_matched",
              "average_salary",
              "work_life_balance",
              "growth_opportunities",
              "remote_or_onsite",
              "job_market_demand",
              "required_skills_and_gaps",
              "certifications_needed",
              "overall_fit_score"
            ]
          }
        },
        additional_recommendations: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Additional career development recommendations"
        }
      },
      required: [
        "candidate_name",
        "summary",
        "experience_level",
        "suggested_jobs",
        "additional_recommendations"
      ]
    }
  },
  required: ["resume_analysis"]
};

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: resumeAnalysisSchema,
  },
});

// Example usage
const jobSuggestion = async (resumeData) => {
  const resData = JSON.stringify(resumeData)
  console.log(resData);
  
  try {
    const result = await model.generateContent(
      `${resData} understand this resume , and provide your job recommedation response , also remember to Provide minimum 3 job recommendations if you can provide more then its good must inlude them. Base all scores and recommendations on current industry standards. Ensure salary ranges and skill requirements are realistic and market-appropriate.`
    );
    return result.response.text()
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { jobSuggestion, resumeAnalysisSchema };
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Define the schema in the required format for Gemini
export const careerAdvisorChatbotSchema = {
  type: "OBJECT",
  properties: {
    response_type: {
      type: "STRING",
      enum: ["analysis", "text"],
      description: "Type of response: 'analysis' or 'text'"
    },
    text_response: {
      type: "STRING",
      description: "Conversational response, either standalone or summary accompanying the analysis"
    },
    career_advisor_report: {
      type: "OBJECT",
      nullable: true,
      description: "Detailed AI Career Advisor report (if applicable)",
      properties: {
        personalized_learning_path: {
          type: "OBJECT",
          description: "Step-by-step learning roadmap for the user",
          properties: {
            target_role: {
              type: "STRING",
              description: "The career role the user wants to achieve"
            },
            total_duration_months: {
              type: "NUMBER",
              description: "Estimated total duration to reach the target role"
            },
            modules: {
              type: "ARRAY",
              description: "Learning modules with details",
              items: {
                type: "OBJECT",
                properties: {
                  module_name: { type: "STRING", description: "Skill or topic to learn" },
                  duration_months: { type: "NUMBER", description: "Time recommended for this module" },
                  description: { type: "STRING", description: "Short description of the module" },
                  prerequisites: { 
                    type: "ARRAY", 
                    items: { type: "STRING" }, 
                    description: "Skills or knowledge required before this module" 
                  },
                  difficulty_level: { type: "STRING", description: "Beginner, Intermediate, or Advanced" },
                  learning_format: { type: "STRING", description: "Video, Article, Hands-on, Interactive" },
                  estimated_hours_per_week: { type: "NUMBER", description: "Suggested weekly study hours" },
                  milestones: { 
                    type: "ARRAY", 
                    items: { type: "STRING" }, 
                    description: "Sub-goals within the module" 
                  },
                  assessment: { type: "STRING", description: "Optional evaluation after module" },
                  certification: { type: "STRING", description: "Recommended certification after completion" },
                  skill_tags: { 
                    type: "ARRAY", 
                    items: { type: "STRING" }, 
                    description: "Skills gained from this module" 
                  },
                  dependencies: { 
                    type: "ARRAY", 
                    items: { type: "STRING" }, 
                    description: "Modules that must be completed first" 
                  },
                  progress_status: { type: "STRING", description: "Completed, In Progress, Not Started" }
                },
                required: ["module_name", "duration_months", "description"]
              }
            },
            projects: {
              type: "ARRAY",
              description: "Hands-on projects to complete",
              items: {
                type: "OBJECT",
                properties: {
                  project_name: { type: "STRING", description: "Project title" },
                  description: { type: "STRING", description: "Short project description" },
                  duration_months: { type: "NUMBER", description: "Time allocated for the project" },
                  skills_applied: { 
                    type: "ARRAY", 
                    items: { type: "STRING" }, 
                    description: "Skills used in the project" 
                  },
                  certification: { type: "STRING", description: "Optional certification linked to project" }
                },
                required: ["project_name", "description", "duration_months"]
              }
            }
          },
          required: ["target_role", "total_duration_months", "modules", "projects"]
        },
        career_insights: {
          type: "OBJECT",
          description: "Data-driven insights about the target career",
          properties: {
            demand_level: { type: "STRING", description: "Demand for the role (High, Medium, Low)" },
            average_salary: { type: "STRING", description: "Expected salary range" },
            top_companies: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Top hiring companies" 
            },
            skills_gap: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Skills missing or recommended to learn" 
            },
            career_growth: { type: "STRING", description: "Expected career progression and growth opportunities" },
            industry_trends: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Emerging trends/tools for the role" 
            },
            location_insights: { type: "STRING", description: "Best cities or remote options" },
            experience_level_breakdown: { 
              type: "OBJECT", 
              description: "Salary & demand by experience level",
              properties: { 
                entry: { type: "STRING" }, 
                mid: { type: "STRING" }, 
                senior: { type: "STRING" } 
              } 
            },
            remote_opportunities: { type: "STRING", description: "Percentage of remote jobs" },
            job_type_distribution: { 
              type: "OBJECT", 
              description: "Job type split",
              properties: { 
                full_time: { type: "NUMBER" }, 
                internship: { type: "NUMBER" }, 
                freelance: { type: "NUMBER" }, 
                contract: { type: "NUMBER" } 
              } 
            },
            top_skills_in_demand: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Trending skills for this role" 
            },
            salary_progression_curve: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Expected salary growth with experience" 
            },
            role_variants: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Specializations under this role" 
            },
            industry_popularity: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Industries hiring most for this role" 
            },
            competitor_analysis: { 
              type: "ARRAY", 
              items: { type: "STRING" }, 
              description: "Skills competitors are gaining" 
            }
          },
          required: ["demand_level", "average_salary", "top_companies", "skills_gap", "career_growth", "industry_trends", "location_insights"]
        },
        job_preparation: {
          type: "OBJECT",
          description: "Guidance for interview and job preparation",
          properties: {
            common_interview_questions: {
              type: "ARRAY",
              description: "Frequently asked questions",
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                  answer_suggestion: { type: "STRING" },
                  category: { type: "STRING" },
                  difficulty_level: { type: "STRING", description: "Easy, Medium, Hard" },
                  expected_answer_length: { type: "STRING", description: "Suggested word count or depth" },
                  follow_up_questions: { type: "ARRAY", items: { type: "STRING" } }
                },
                required: ["question", "answer_suggestion", "category"]
              }
            },
            preparation_tips: { type: "ARRAY", items: { type: "STRING" }, description: "General tips for job readiness" },
            resources: { type: "ARRAY", items: { type: "STRING" }, description: "Helpful resources categorized by type" },
            mock_interview_score: { type: "NUMBER", description: "AI-assessed performance score" },
            behavioral_vs_technical_ratio: { type: "STRING", description: "Balance of behavioral vs technical questions" },
            recommended_study_time: { type: "STRING", description: "Suggested hours to prepare per category" },
            role_specific_scenarios: { type: "ARRAY", items: { type: "STRING" }, description: "Case studies / problem-solving exercises" },
            common_pitfalls: { type: "ARRAY", items: { type: "STRING" }, description: "Typical mistakes to avoid in interviews" },
            hr_culture_insights: { type: "ARRAY", items: { type: "STRING" }, description: "Company culture tips / guidance" }
          },
          required: ["common_interview_questions", "preparation_tips", "resources"]
        }
      }
    }
  },
  required: ["response_type", "text_response"]
};

// System instruction
const systemInstruction = `You are Forge-AI, an AI career advisor chatbot. Your role is to:
- Analyze user resumes, uploaded job descriptions, and career goals.
- Generate a personalized learning path with step-by-step modules and projects.
- Provide career insights, including market demand, skill gaps, top companies, salary ranges, location trends, role variants, and emerging industry trends.
- Suggest job preparation guidance with interview questions, tips, mock interview scores, resources, pitfalls, and HR/culture insights.
- Respond conversationally to greetings, queries, or advice requests.
- Always return responses in JSON format according to the provided schema, with "response_type" set to "analysis" for structured career reports or "text" for conversational replies. Include a "text_response" in all cases summarizing the report or providing a standalone reply.
- If the user requests specific parts like "Job Preparation", "Career Insights", or "Personalized Learning Path", include only those in the career_advisor_report.
- Use up-to-date information as of September 21, 2025.
- For job preparation requests, provide 5-7 common interview questions with detailed answer suggestions.
- Always ensure the JSON is valid and complete according to the schema.`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = "" } = body;

    if (!message) {
      return new Response(
        JSON.stringify({
          response: {
            response_type: "text",
            text_response: "Hello! I'm Forge-AI. Upload your resume, input a job description, or ask for career guidance to get started.",
            career_advisor_report: null,
          },
          updated_history: history,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create model with system instruction
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: careerAdvisorChatbotSchema,
      },
    });

    // Construct prompt with history
    const prompt = `${history ? history + "\n" : ""}User: ${message}`;

    // Generate content
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Raw AI Response:", text);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw text:", text);
      parsedResponse = {
        response_type: "text",
        text_response: "I apologize, but I encountered an issue processing your request. Please try rephrasing your question.",
        career_advisor_report: null
      };
    }

    // Validate and fix response structure
    parsedResponse.response_type = parsedResponse.response_type || "text";
    parsedResponse.text_response = parsedResponse.text_response || "Here's my analysis.";
    parsedResponse.career_advisor_report = parsedResponse.career_advisor_report || null;

    // Validate career_advisor_report if present
    if (parsedResponse.career_advisor_report) {
      const report = parsedResponse.career_advisor_report;
      report.personalized_learning_path = report.personalized_learning_path || { target_role: "N/A", total_duration_months: 0, modules: [], projects: [] };
      report.career_insights = report.career_insights || {};
      report.job_preparation = report.job_preparation || { common_interview_questions: [], preparation_tips: [], resources: [] };
    }

    const updatedHistory = `${history ? history + "\n" : ""}User: ${message}\nAssistant: ${text}`.trim();

    return new Response(
      JSON.stringify({
        response: parsedResponse,
        updated_history: updatedHistory,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        response: {
          response_type: "text",
          text_response: "Sorry, I encountered an error. Please try again.",
          career_advisor_report: null,
        },
        updated_history: "",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
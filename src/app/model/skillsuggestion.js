import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const SkillSuggestionSchema = {
    description: "Resume analysis data structure",
    type: SchemaType.OBJECT,
    properties: {
      recommendations: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            skill: { type: SchemaType.STRING, description: "Skill name" },
            description: { type: SchemaType.STRING, description: "Brief skill description" },
            importance: { type: SchemaType.STRING, description: "Why this skill is important" },
            difficulty: { type: SchemaType.STRING, description: "Difficulty level" },
            expected_time_to_master: { type: SchemaType.STRING, description: "Estimated time to master the skill" },
            career_roles: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Potential career roles"
            },
            average_salary: { type: SchemaType.STRING, description: "Salary range for this skill" },
            courses: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  title: { type: SchemaType.STRING, description: "Course title" },
                  provider: { type: SchemaType.STRING, description: "Course provider" },
                  link: { type: SchemaType.STRING, description: "Course link" },
                  duration: { type: SchemaType.STRING, description: "Course duration" },
                  format: { type: SchemaType.STRING, description: "Course format" }
                },
                required: ["title", "provider", "link", "duration", "format"]
              },
              description: "List of recommended courses"
            },
            learning_path: {
              type: SchemaType.OBJECT,
              properties: {
                phase_1: {
                  type: SchemaType.OBJECT,
                  properties: {
                    title: { type: SchemaType.STRING, description: "Phase 1 title" },
                    topics: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Topics covered"
                    },
                    practical_exercises: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Practical exercises"
                    }
                  }
                },
                phase_2: {
                  type: SchemaType.OBJECT,
                  properties: {
                    title: { type: SchemaType.STRING, description: "Phase 2 title" },
                    topics: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Topics covered"
                    },
                    practical_exercises: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Practical exercises"
                    }
                  }
                },
                phase_3: {
                  type: SchemaType.OBJECT,
                  properties: {
                    title: { type: SchemaType.STRING, description: "Phase 3 title" },
                    topics: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Topics covered"
                    },
                    practical_exercises: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Practical exercises"
                    }
                  }
                },
                phase_4: {
                  type: SchemaType.OBJECT,
                  properties: {
                    title: { type: SchemaType.STRING, description: "Phase 4 title" },
                    topics: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Topics covered"
                    },
                    practical_exercises: {
                      type: SchemaType.ARRAY,
                      items: { type: SchemaType.STRING },
                      description: "Practical exercises"
                    }
                  }
                }
              },
              description: "Structured learning path with phases"
            }
          },
          required: [
            "skill",
            "description",
            "importance",
            "difficulty",
            "expected_time_to_master",
            "career_roles",
            "average_salary",
            "courses",
            "learning_path"
          ]
        }
      }
    }
  };
  
// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: SkillSuggestionSchema,
  },
});

// Example usage
const GenerateSkillsSuggestion = async (resumeData) => {
    const resData = JSON.stringify(resumeData)
    console.log(resData);
    
    try {
      const result = await model.generateContent(
        `${resData} analyze this resume and suggest Skills to Imporve with its Links and Learning Path ( Syllabus )`
      );
      return result.response.text()
    } catch (error) {
      console.error("Error Generating resume review:", error);
      throw error;
    }
};

export { GenerateSkillsSuggestion, SkillSuggestionSchema };

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const resumeReviewSchema = {
    description: "Resume review data structure",
    type: SchemaType.OBJECT,
    properties: {
      status: {
        type: SchemaType.STRING,
        description: "Status of the review process",
        enum: ["success", "failure", "pending"]
      },
      resume_review: {
        type: SchemaType.OBJECT,
        properties: {
          overall_rating: {
            type: SchemaType.NUMBER,
            description: "Overall rating of the resume out of 10"
          },
          general_feedback: {
            type: SchemaType.STRING,
            description: "General feedback about the resume"
          },
          strengths: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                title: {
                  type: SchemaType.STRING,
                  description: "Title of the strength category"
                },
                points: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "List of specific strength points"
                }
              },
              required: ["title", "points"]
            }
          },
          improvements: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                section: {
                  type: SchemaType.STRING,
                  description: "Resume section requiring improvement"
                },
                issue: {
                  type: SchemaType.STRING,
                  description: "Description of the issue"
                },
                feedback: {
                  type: SchemaType.STRING,
                  description: "Detailed feedback about the issue"
                },
                suggestions: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                  description: "List of suggested improvements"
                },
                example_improvement: {
                  type: SchemaType.OBJECT,
                  description: "Examples of improvements as before/after comparisons",
                  properties: {
                    before: { 
                      type: SchemaType.STRING, 
                      description: "Original content" 
                    },
                    after: { 
                      type: SchemaType.STRING, 
                      description: "Improved content" 
                    },
                    title: { 
                      type: SchemaType.STRING, 
                      description: "Title of the example (if applicable)",
                      nullable: true 
                    }
                  },
                  required: ["before", "after"]
                }
              },
              required: ["section", "issue", "feedback", "suggestions"]
            }
          },
          final_verdict: {
            type: SchemaType.OBJECT,
            properties: {
              improved_rating: {
                type: SchemaType.NUMBER,
                description: "Expected rating after implementing improvements"
              },
              improvements_applied: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "List of improvements that were applied"
              }
            },
            required: ["improved_rating", "improvements_applied"]
          }
        },
        required: ["overall_rating", "general_feedback", "strengths", "improvements", "final_verdict"]
      }
    },
    required: ["status", "resume_review"]
  };

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: resumeReviewSchema,
  },
});

// Example usage
const ReviewResume = async (resumeData) => {
  const resData = JSON.stringify(resumeData)
  console.log(resData);
  
  try {
    const result = await model.generateContent(
      `${resData} judge this resume in different parameters and give review & also suggest improvements`
    );
    return result.response.text()
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { ReviewResume, resumeReviewSchema };
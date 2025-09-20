import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const resumeSchema = {
  description: "Resume data structure",
  type: SchemaType.OBJECT,
  properties: {
    personalInfo: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING, description: "Full name of the person" },
        email: { type: SchemaType.STRING, description: "Email address", nullable: true },
        phone: { type: SchemaType.STRING, description: "Contact number", nullable: true },
        linkedin: { type: SchemaType.STRING, description: "LinkedIn profile URL", nullable: true },
        github: { type: SchemaType.STRING, description: "GitHub profile URL", nullable: true },
        location: { type: SchemaType.STRING, description: "Current location", nullable: true },
        portfolio: { type: SchemaType.STRING, description: "Portfolio website URL", nullable: true }
      },
      required: ["name"]
    },
    summary: {
      type: SchemaType.STRING,
      description: "Professional summary or objective statement"
    },
    education: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          degree: { type: SchemaType.STRING, description: "Name of the degree" },
          school: { type: SchemaType.STRING, description: "Name of the institution" },
          location: { type: SchemaType.STRING, description: "Location of the institution", nullable: true },
          graduation: { type: SchemaType.STRING, description: "Graduation date" },
          gpa: { type: SchemaType.NUMBER, description: "Grade Point Average", nullable: true },
          courses: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "List of relevant courses",
            nullable: true
          }
        },
        required: ["degree", "school", "graduation"]
      }
    },
    skills: {
      type: SchemaType.OBJECT,
      properties: {
        categories: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              category: { type: SchemaType.STRING, description: "Skill category name" },
              skills: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "List of skills in this category"
              }
            },
            required: ["category", "skills"]
          }
        }
      },
      required: ["categories"]
    },
    projects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING, description: "Project title" },
          details: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Project details and achievements"
          },
          technologies: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Technologies used",
            nullable: true
          }
        },
        required: ["title", "details"]
      },
      nullable: true
    },
    experience: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING, description: "Job title" },
          company: { type: SchemaType.STRING, description: "Company name" },
          location: { type: SchemaType.STRING, description: "Job location", nullable: true },
          period: { type: SchemaType.STRING, description: "Employment period" },
          achievements: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Key achievements and responsibilities"
          }
        },
        required: ["title", "company", "period", "achievements"]
      },
      nullable: true
    },
    certifications: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "Professional certifications"
      },
      nullable: true
    },
    extracurricular: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "Extracurricular activities"
      },
      nullable: true
    }
  },
  required: ["personalInfo", "summary", "education", "skills"]
};

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: resumeSchema,
  },
});

// Example usage
const generateDigitalResume = async (resumeText) => {
  try {
    const result = await model.generateContent(
      `Parse the following resume into a structured format: ${resumeText}`
    );
    return result.response.text()
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw error;
  }
};

export { generateDigitalResume, resumeSchema };

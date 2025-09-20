import { GoogleGenerativeAI } from "@google/generative-ai";
import { careerRecommendationsSchema } from "./commonSchemas";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: careerRecommendationsSchema,
  },
});

// Example usage
const generateCareerPath = async (assessmentData) => {
  const aData = JSON.stringify(assessmentData);
  console.log("generateCareerPath path called")
  //   console.log(resData);

  try {
    const result = await model.generateContent(
      `${aData} understand given data of user , and Generate career path for given schema`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export default generateCareerPath;
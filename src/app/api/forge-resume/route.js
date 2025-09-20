// app/api/parse-resume/route.js
// import { parseResume } from '@/utils/model'; // Adjust the import path based on your file structure
import { parseResume } from '@/app/model/geminiModel';
import { NextResponse } from 'next/server';

// Utility function to clean resume text
const cleanResumeText = (text) => {
  return text
    .trim()
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ');
};

// API Route Handler
export async function POST(req) {
  try {
    // Validate request
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Get resume text from request body
    const data = await req.json();
    const { resumeText } = data;

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        { error: "Resume text is required and must be a string" },
        { status: 400 }
      );
    }

    // Clean the resume text
    const cleanedText = cleanResumeText(resumeText);

    // Generate structured resume data
    const parsedResumeText = await parseResume(cleanedText);
    
    // Parse the response to ensure it's valid JSON
    let parsedResume;
    try {
      parsedResume = JSON.parse(parsedResumeText);
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return NextResponse.json(
        { error: "Failed to parse resume data" },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: parsedResume
    });

  } catch (error) {
    console.error("Error processing resume:", error);
    
    // Handle specific error types if needed
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to process resume",
        details: error.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json(
    { status: "healthy", message: "Resume parser API is running" },
    { status: 200 }
  );
}
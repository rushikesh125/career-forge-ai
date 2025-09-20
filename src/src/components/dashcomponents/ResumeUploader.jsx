"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomBtn from "../CustomBtn";
import { useSelector } from "react-redux";
import { insertUserResume } from "@/firebase/users/write";
import { generateDigitalResume } from "@/app/model/geminiModel";
import { Settings } from "lucide-react";

export default function ResumeUploader() {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const user = useSelector((state) => state.user);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only PDF and DOCX are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setError(null);
    setResume(file);
  };

  const handleUpload = async () => {
    if (!resume) {
      setError("Please upload a resume.");
      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("resume", resume);

    setIsLoading(true);
    setStatus("Processing...");
    try {
      const response = await fetch(
        "https://forge-ai-api.vercel.app/api/resumetext",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      const result = await response.json();
      setStatus("Resume Extracted successfully");
      let textResume = JSON.stringify(result.text);
      console.log(textResume);

      try {
        setStatus("Generating Digial Resume...");
        // const resumeRes = await fetch("./api/forge-resume", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     resumeText: textResume,
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // const userResume = await resumeRes.json();
        const userResume = JSON.parse(await generateDigitalResume(textResume));
        console.log(userResume);
        console.log(typeof userResume);
        await insertUserResume({ uid: user?.uid, data: userResume });
        toast.success("User Profile Generated Successfully");
        setStatus("Generated Successfully ✅ , please check in User Profile");
      } catch (error) {
        setError(`error::${error?.message}`);
      }
    } catch (err) {
      setError("Error uploading resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mt-6 grid grid-cols-1 gap-4">
      {/* Upload Resume Section */}
      <div className="bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Upload Resume
        </h2>
        <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 p-10 text-center rounded-lg">
          <input
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF, DOCX (MAX. 5MB)
            </p>
          </label>
          {resume && (
            <p className="text-green-600 dark:text-green-400 mt-2">
              {resume.name} Selected
            </p>
          )}
        </div>

        {status && (
          <div className="p-1 text-green-400 flex justify-center ">
            
            {isLoading && <Settings className="animate-spin" />} {status}
          </div>
        )}
        <CustomBtn
          isLoading={isLoading}
          onClick={handleUpload}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          Upload Resume
        </CustomBtn>
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
}

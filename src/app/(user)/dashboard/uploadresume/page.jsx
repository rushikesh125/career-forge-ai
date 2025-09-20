import JobDescriptionInput from "@/components/dashcomponents/JobDescription";
import ResumeUploader from "@/components/dashcomponents/ResumeUploader";
import { FileUp } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main className="pt-20 p-4 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <ResumeUploader />
        {/* <div className="bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Job Description
          </h2>
          <textarea
            className="w-full h-40 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Paste the job description here..."
          ></textarea>
          <button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700">
            Compare with Resume
          </button>
        </div> */}
      </div>
    </main>
  );
};

export default page;

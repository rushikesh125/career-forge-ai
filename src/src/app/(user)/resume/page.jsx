import ResumeUploader from "@/components/dashcomponents/ResumeUploader";
import { FileUp } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <main className="pt-20 p-4 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <ResumeUploader />
        <div className="bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-80 p-6 rounded-lg shadow-lg">
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
        </div>

        {/* {error && <p className="text-red-500 text-center mt-4">{error}</p>} */}

        {/* Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    <p className="text-sm">User activity {item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Add User", "Create Project", "View Reports", "Settings"].map(
                (action) => (
                  <button
                    key={action}
                    className="p-4 rounded-lg text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {action}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

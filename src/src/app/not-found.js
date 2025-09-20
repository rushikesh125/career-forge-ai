"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            404
          </h1>

          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/10 dark:bg-blue-800/20 rounded-full blur-xl"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -bottom-4 -left-6 w-16 h-16 bg-purple-500/10 dark:bg-purple-800/20 rounded-full blur-xl"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Oops! The page you're looking for seems to have gone on vacation.
            Let's get you back to somewhere familiar.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C7D2FE,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#4C51BF,transparent)]">
          </div>
        </div>
      </div>
    </div>
  );
}

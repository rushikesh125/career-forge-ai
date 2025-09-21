"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ListCheck, Search, User } from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Automatically extract and analyze key skills, education, and experience from your resume to build a strong career profile.",
  },
  {
    id: 2,
    icon: ListCheck,
    title: "Career Path Generation",
    description:
      "Get a detailed, step-by-step career roadmap tailored to your existing skills and chosen area of interest.",
  },
  {
    id: 3,
    icon: Search,
    title: "Job Role Suggestions",
    description:
      "Explore personalized job roles and opportunities that align with your skills, background, and career goals.",
  },
  {
    id: 4,
    icon: User,
    title: "Personalized Skill Gaps & Improvements",
    description:
      "Identify missing or weak skills and receive AI-powered recommendations to improve and stay job-ready.",
  },
];

const FeatureCard = ({ icon: Icon, title, description, isActive }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isActive ? -20 : 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isActive ? 20 : -20, scale: 0.95 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      className="relative p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 transform transition-transform hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 rounded-full p-3">
        <Icon className="text-white h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === featuresData.length ? 1 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuresData.map((feature) => (
          <AnimatePresence key={feature.id}>
            {activeFeature === feature.id && (
              <FeatureCard
                {...feature}
                isActive={activeFeature === feature.id}
              />
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;

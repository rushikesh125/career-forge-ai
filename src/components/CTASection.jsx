"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className=" relative py-24 bg-white dark:bg-black">
      <div className="absolute h-52 w-52 blur-[90px] left-1/2 -translate-x-1/2 bottom-0 rounded-full  bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 md:blur-[100px] md:left-10 md:top-1/2 md:-translate-y-1/2  z-0"></div>
      <div className="hidden md:block absolute h-52 w-52 rounded-full  bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 md:blur-[100px] right-10 top-1/2 -translate-y-1/2  z-0"></div>
      <div className="relative container mx-auto px-4 text-center z-20">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  bg-clip-text text-transparent mb-6">
       Forge Your Future with AI-Powered Career Guidance
        </h2>
        <p className="text-xl text-black/90 dark:text-white/90 mb-8 max-w-2xl mx-auto">
       Unlock personalized career paths, job matches, and skill insights designed just for you.
        </p>
        <button className="px-8 py-4 bg-black dark:bg-white  text-white dark:text-violet-500 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto group">
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;


"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  CircleCheckBig,
  Computer,
  ScanSearch,
} from "lucide-react";

let interval;

export const CardStack = ({ offset, scaleFactor }) => {
  const cards = [
    {
      id: 0,
      name: "AI-Powered Analysis",
      icon: BrainCircuit,
      content: (
        <p>
          Our advanced algorithms analyze your resume for content, structure,
          and keywords, ensuring it aligns perfectly with job requirements.
        </p>
      ),
    },
    {
      id: 1,
      name: "Personalized Suggestions",
      icon: ScanSearch,
      content: (
        <p>
          Receive tailored recommendations on improving your resume's clarity,
          impact, and ATS compatibility.
        </p>
      ),
    },
    {
      id: 2,
      name: "Job Matching",
      icon: CircleCheckBig,
      content: (
        <p>
          Discover relevant job openings that match your skills and experience,
          based on your optimized resume.
        </p>
      ),
    },
    {
      id: 3,
      name: "User-Friendly Interface",
      icon: Computer,
      content: (
        <p>
          Easily upload your resume and job descriptions with our intuitive
          platform – no technical skills required.
        </p>
      ),
    },
  ];
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cardItems, setCards] = useState(cards);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative mx-auto z-20 h-60 w-full md:h-60 md:w-96  flex justify-center">
      {cardItems.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black/[0.80] bg-white h-60 w-11/12  md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between backdrop-blur-lg"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cardItems.length - index, // decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div className="flex items-center gap-2">
              <Icon className="text-purple-500" size={30} />
              <p className="font-medium bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                {card.name}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

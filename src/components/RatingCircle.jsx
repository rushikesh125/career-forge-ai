import React from "react";

const RatingCircle = ({ rating }) => {
  const size = 100; // Size of the SVG
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (rating / 10) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      {/* Rating Text */}
      <span
        className="absolute text-xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent"
      >
        {rating}/10
      </span>
    </div>
  );
};

export default RatingCircle;

import ChatInterface from "@/components/ForgeBotInterface";
import React from "react";

const ForgeBot = () => {
  return (
    <>
      <main className="pt-20 p-4 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <ChatInterface/>
        </div>
      </main>
    </>
  );
};

export default ForgeBot;

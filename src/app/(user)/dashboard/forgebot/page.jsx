import ChatInterface from "@/components/ForgeBotInterface";
import React from "react";

const ForgeBot = () => {
  return (
    <>
      <main className="p-4 text-gray-800 dark:text-white">
        <div className=" mx-auto">
          <ChatInterface/>
        </div>
      </main>
    </>
  );
};

export default ForgeBot;

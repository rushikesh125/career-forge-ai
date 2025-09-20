import { useState } from "react";
import { Send, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: "Thinking..." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <motion.h1
        className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI ChatBot
      </motion.h1>
      <Card className="w-full max-w-3xl mt-6 shadow-xl border dark:border-gray-700 rounded-2xl bg-gray-800/50 backdrop-blur-lg">
        <ScrollArea className="p-4 space-y-4 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.type === "bot" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  msg.type === "bot"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-gray-700 text-white shadow-lg"
                }`}
              >
                {msg.type === "bot" && <Bot className="inline mr-2" size={16} />}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </ScrollArea>
      </Card>
      <div className="w-full max-w-3xl mt-4 flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-600 bg-gray-800 text-white rounded-full"
        />
        <Button onClick={sendMessage} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white p-3 rounded-full shadow-lg">
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
}

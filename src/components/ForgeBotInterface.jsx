"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, BotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RenderAssistantMessage from "./RenderAssistantMessage";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      content: {
        response_type: "text",
        text_response: "Hi! I am Career Forge AI. How can I help you?",
      },
      role: "assistant",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Prompt options
  const promptOptions = [
    "Personalized Learning Path",
    "Career Insights",
    "Job Preparation",
  ];

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const sendMessageToAPI = async (message, history, options) => {
    try {
      // Build prompt with selected options
      let promptMessage = message;
      if (options.length > 0) {
        const optionPrompt = `Please generate ${options.join(" and ")} for `;
        promptMessage = `${optionPrompt}${message}`;
      }

      const response = await fetch("/api/forgebot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptMessage,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", JSON.stringify(data, null, 2));
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      return {
        response_type: "text",
        text_response: "Sorry, an error occurred. Please try again.",
        career_advisor_report: null
      };
    }
  };

  const getHistoryString = () => {
    return messages
      .map((msg) => {
        const role = msg.role === "user" ? "User" : "Assistant";
        const content = typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content);
        return `${role}: ${content}`;
      })
      .join("\n");
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const history = getHistoryString();
      const aiResponse = await sendMessageToAPI(userInput, history, selectedOptions);

      setSelectedOptions([]);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  };

  const formatTimestamp = (timestamp) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));

  return (
    <div className="flex flex-col h-[90vh] rounded-xl bg-background shadow-xl dark:bg-gray-800">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          Career Forge AI
        </h2>
        {selectedOptions.length > 0 && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {selectedOptions.join(", ")}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              message.role === "assistant" ? "mr-auto" : "ml-auto flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md",
                message.role === "assistant"
                  ? "bg-gradient-to-r from-purple-500 to-violet-500 ring-2 ring-purple-500/20"
                  : "bg-gradient-to-r from-violet-500 to-pink-500 ring-2 ring-pink-500/20"
              )}
            >
              {message.role === "assistant" ? (
                <Bot size={18} className="text-white" />
              ) : (
                <User size={18} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm shadow-sm max-w-full",
                  message.role === "assistant"
                    ? "bg-muted/50 hover:bg-muted/80 transition-colors"
                    : "bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white"
                )}
              >
                <RenderAssistantMessage>{message.content}</RenderAssistantMessage>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3 max-w-[80%] mr-auto">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-violet-500">
              <BotIcon size={18} className="text-white" />
            </div>
            <div className="flex space-x-2 rounded-2xl bg-muted/50 px-4 py-2.5 text-sm">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form 
        className="p-4 bg-gradient-to-r from-purple-500/5 via-violet-500/5 to-pink-500/5 border-t" 
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <div className="flex gap-2 items-end relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift + Enter for new line)"
            disabled={isLoading}
            className="text-black dark:text-white dark:bg-gray-700 flex-1 rounded-xl outline-none border border-input min-h-[48px] max-h-[200px] overflow-y-auto resize-none py-3 px-4 leading-tight"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow h-12 px-4 disabled:opacity-50"
          >
            <Send size={18} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {promptOptions.map((option) => (
            <Button
              key={option}
              variant={selectedOptions.includes(option) ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                toggleOption(option);
              }}
              className="text-xs"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-1 text-xs text-muted-foreground text-center">
          Press Enter to send, Shift + Enter for new line
        </div>
      </form>

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: currentColor;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
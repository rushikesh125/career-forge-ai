"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, BotIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomBtn from "./CustomBtn";
import AiResponse from "./AiResponse";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { content: "Hi! i am Career Forge AI, How can i help you?", role: "assistant",timestamp:Date.now(),id:845938},
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {}, []);

  // // Save messages to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem("chatMessages", JSON.stringify(messages))
  // }, [messages])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Changed to trigger on messages change

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch("/api/forgebot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    console.log("msg", messages);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get response from API
      const aiResponse = await sendMessageToAPI(input.trim());

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, there was an error processing your request. Please try again.",
        role: "assistant",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "48px";
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp));
  };

  return (
    <div className="flex flex-col h-[90vh] rounded-xl bg-background shadow-xl dark:bg-gray-800">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
          Career Forge AI
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              message.role === "assistant"
                ? "mr-auto"
                : "ml-auto flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full shadow-md",
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
            <div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                  message.role === "assistant"
                    ? "bg-muted/50 hover:bg-muted/80 transition-colors"
                    : "bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white"
                )}
              >
                <AiResponse>{message.content}</AiResponse>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 max-w-[80%]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-gradient-to-r from-purple-500 to-violet-500">
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
        onSubmit={handleSubmit}
        className="p-4 bg-gradient-to-r from-purple-500/5 via-violet-500/5 to-pink-500/5"
      >
        <div className="flex gap-2 items-end relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift + Enter for new line)"
            disabled={isLoading}
            className="text-black dark:text-white dark:bg-gray-700 flex-1 rounded-xl outline-none border-none min-h-[48px] max-h-[200px] overflow-y-auto resize-none py-3 px-4 leading-tight"
            style={{
              height: "48px",
            }}
          />
          <CustomBtn
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow h-12 px-4"
          >
            <Send size={18} />
          </CustomBtn>
        </div>
        <div className="mt-1 text-xs text-muted-foreground text-center">
          Press Enter to send, Shift + Enter for new line
        </div>
      </form>
    </div>
  );
}

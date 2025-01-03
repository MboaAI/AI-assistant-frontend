"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { analyzeDiscoursBackend } from "@/api/chat";
import translations from "../translations";

export function Assistant({ lang }: { lang: "en" | "fr" }) {
  const t = translations[lang];
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "ai"; message: string; isHTML?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChatHistory([
      {
        sender: "ai",
        message: `<strong>${t.welcomeMessage}</strong>`,
        isHTML: true,
      },
    ]);
  }, [lang]);

  async function analyzeDiscours(user_input: string) {
    if (!user_input.trim()) return;

    const userMessage = user_input.trim();
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
    ]);
    setUserInput("");
    setLoading(true);

    try {
      const aiMessage = await analyzeDiscoursBackend(userMessage);
      const formattedMessage = formatResponse(aiMessage);

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: formattedMessage, isHTML: true },
      ]);
    } catch (error) {
      console.error("Error in analyzeDiscours:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          message: `${t.errorMessage}`,
          isHTML: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function formatResponse(response: string): string {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const urlRegex = /(?<!")\bhttps?:\/\/[^\s<]+/g;

    let formattedResponse = response.replace(
      markdownLinkRegex,
      (match, text, url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${text}</a>`
    );

    formattedResponse = formattedResponse.replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${url}</a>`
    );

    return formattedResponse
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/## (.*?)(?=\n|$)/g, "<h2>$1</h2>")
      .replace(/### (.*?)(?=\n|$)/g, "<h3>$1</h3>")
      .replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>")
      .replace(/(?:\r\n|\r|\n)/g, "<br/>");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full max-w-3xl min-h-[70vh] bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">{t.title}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-900">
          {chatHistory.map((entry, index) => (
            <motion.div
              key={index}
              className={`w-4/4 p-4 rounded-lg shadow-md ${entry.sender === "user"
                ? "bg-blue-100 text-gray-900 dark:bg-blue-700 dark:text-gray-100 self-end"
                : "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 self-start"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {entry.isHTML ? (
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: entry.message }}
                />
              ) : (
                <p className="text-sm">{entry.message}</p>
              )}

            </motion.div>
          ))}
          {loading && (
            <motion.div
              className="w-4/4 p-4 rounded-lg shadow-md bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 self-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm italic">{t.loading}</p>
            </motion.div>
          )}
        </div>

        <div className="p-4 bg-white shadow-md dark:bg-gray-800 items-center justify-center">
          <div className="flex space-x-2 items-center justify-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              placeholder={t.searchPlaceholder}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeDiscours(userInput)}
            />
            <button
              onClick={() => analyzeDiscours(userInput)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? t.loading : t.sendButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
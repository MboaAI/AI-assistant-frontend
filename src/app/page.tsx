"use client";

import { Assistant } from "./components/assistant-view";
import { useState } from "react";
import translations from "@/app/translations";

export default function Dashboard() {
  const [lang, setLang] = useState<"en" | "fr">("fr"); // Manage language state
  const t = translations[lang]; // Dynamically get translations based on selected language
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state

  const changeLanguage = (newLang: "en" | "fr") => {
    if (lang !== newLang) {
      setLang(newLang);
      setIsDropdownOpen(false); // Close dropdown after selection
    }
  };

  return (
    <>
      {/* Main Page Content */}
      <div className="relative container mx-auto p-4">
        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-50">
          <div
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-md cursor-pointer flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-900 dark:text-gray-100">
              {lang === "en" ? "English" : "Français"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-md w-32">
              <button
                className={`block w-full text-left px-4 py-2 text-sm rounded-t-lg ${lang === "en"
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm rounded-b-lg ${lang === "fr"
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                onClick={() => changeLanguage("fr")}
              >
                Français
              </button>
            </div>
          )}
        </div>

        {/* Assistant Component */}
        <div className="mt-6">
          <Assistant lang={lang} />
        </div>
      </div>
    </>
  );
}

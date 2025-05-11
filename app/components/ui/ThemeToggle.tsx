import React from "react";
import { Theme } from "../../types";

interface ThemeToggleProps {
  theme: Theme;
  setSpecificTheme: (theme: Theme) => void;
}

/**
 * テーマ切替のUIコンポーネント
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  setSpecificTheme,
}) => {
  return (
    <div className="inline-block">
      <div
        className={`p-1 rounded-full ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        } transition-colors duration-300`}
      >
        <div className="flex text-xs sm:text-sm">
          <button
            onClick={() => setSpecificTheme("light")}
            className={`relative px-3 sm:px-4 py-1.5 rounded-full flex items-center font-medium transition-all duration-300 ${
              theme === "light"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="ライトモードに切り替え"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1 sm:h-4 sm:w-4 sm:mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            ライト
          </button>
          <button
            onClick={() => setSpecificTheme("dark")}
            className={`relative px-3 sm:px-4 py-1.5 rounded-full flex items-center font-medium transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 text-blue-400 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
            aria-label="ダークモードに切り替え"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1 sm:h-4 sm:w-4 sm:mr-1.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            ダーク
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;

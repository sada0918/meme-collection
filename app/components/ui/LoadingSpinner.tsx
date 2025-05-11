import React from "react";
import { Theme } from "../../types";

interface LoadingSpinnerProps {
  theme: Theme;
}

/**
 * ローディング表示用のスピナーコンポーネント
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${
          theme === "dark" ? "border-blue-400" : "border-blue-500"
        }`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;

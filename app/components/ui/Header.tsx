import React from "react";
import ThemeToggle from "./ThemeToggle";
import { getCurrentDateJP } from "../../utils/dataUtils";
import { Theme } from "../../types";

interface HeaderProps {
  theme: Theme;
  setSpecificTheme: (theme: Theme) => void;
}

/**
 * アプリケーションのヘッダーコンポーネント
 */
const Header: React.FC<HeaderProps> = ({ theme, setSpecificTheme }) => {
  const currentDate = getCurrentDateJP();

  return (
    <header className="text-center mb-6 sm:mb-10">
      <div
        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mb-4 ${
          theme === "dark"
            ? "bg-blue-950 text-blue-300 border border-blue-900"
            : "bg-blue-50 text-blue-600 border border-blue-100"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            theme === "dark" ? "bg-blue-400" : "bg-blue-500"
          }`}
        ></span>
        {currentDate} 更新
      </div>

      {/* レスポンシブなタイトル - スマホでの改行を防止 */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 transition-all duration-500 leading-tight ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text"
            : "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text"
        }`}
      >
        例のミームまとめ
      </h1>

      <p
        className={`max-w-lg mx-auto mb-6 text-sm sm:text-base ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Xで話題のミームポストをまとめてチェック！
      </p>

      {/* テーマ切替ボタン */}
      <ThemeToggle theme={theme} setSpecificTheme={setSpecificTheme} />
    </header>
  );
};

export default Header;

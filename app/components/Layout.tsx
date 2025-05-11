import React, { ReactNode } from "react";
import { Theme } from "../types";

interface LayoutProps {
  children: ReactNode;
  theme: Theme;
  bgStyle: React.CSSProperties;
  isPageLoaded: boolean;
}

/**
 * アプリケーション全体のレイアウトを管理するコンポーネント
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  theme,
  bgStyle,
  isPageLoaded,
}) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
      style={bgStyle}
    >
      <div
        className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;

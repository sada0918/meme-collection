import React from "react";
import { Theme } from "../../types";

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className="mt-10 sm:mt-16 pt-4 sm:pt-6 text-center">
      <p
        className={`text-xs sm:text-sm ${
          theme === "dark" ? "text-gray-600" : "text-gray-400"
        }`}
      >
        © {new Date().getFullYear()} Meme Collection / 作成者: さだ
      </p>
    </footer>
  );
};

export default Footer;

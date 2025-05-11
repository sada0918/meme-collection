"use client";

import { Tweet } from "react-tweet";
import { extractTweetId } from "../utils/tweet-utils";
import { useState, useEffect } from "react";

export default function Home() {
  // ステート管理
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [activeTweetIndex, setActiveTweetIndex] = useState<number | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // 例のツイート一覧
  const tweets = [
    "1917513692163498304",
    "1920783669263786213",
    "1918823508097786303",
  ];

  const tweetIds = tweets.map((tweet) => extractTweetId(tweet));

  // ページのロード完了状態を管理
  useEffect(() => {
    setMounted(true);
    // フェードインアニメーションのタイミング
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // テーマの初期設定
  useEffect(() => {
    if (!mounted) return;

    // システム設定の監視を設定
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      if (!savedTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // 初期テーマを設定
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [mounted]);

  // テーマ切替
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 特定のテーマを設定
  const setSpecificTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 現在の日付
  const currentDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // テーマに応じた背景グラデーション効果
  const bgStyle =
    theme === "dark"
      ? {
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.08) 0%, rgba(0, 0, 0, 0) 60%)",
        }
      : {
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.06) 0%, rgba(255, 255, 255, 0) 60%)",
        };

  if (!mounted) {
    // 最初の表示時のフラッシュを防ぐためのプレースホルダー
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
  }

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
        {/* ヘッダーを中央寄せ - レスポンシブ調整 */}
        <header className="text-center mb-10 sm:mb-16">
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

          {/* 洗練されたタブ型テーマスイッチ */}
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
        </header>

        {/* ツイート全体を囲むマット - プレミアムデザイン */}
        <div
          className={`rounded-xl overflow-hidden transition-all duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)]"
              : "bg-white border border-gray-100 shadow-xl"
          }`}
        >
          {/* マットのヘッダー */}
          <div
            className={`px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm ${
              theme === "dark"
                ? "border-b border-gray-700 bg-gray-800/80"
                : "border-b border-gray-100 bg-gray-50/80"
            }`}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span
                className={`ml-2 text-xs sm:text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                話題のツイート
              </span>
              <div className="ml-auto flex space-x-1">
                {tweetIds.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                      activeTweetIndex === index
                        ? theme === "dark"
                          ? "bg-blue-400"
                          : "bg-blue-500"
                        : theme === "dark"
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* ツイート本体コンテンツ - 間隔を短く調整 */}
          <div className="p-4 sm:p-6">
            <div className="space-y-2">
              {tweetIds.map((id, index) => (
                <div
                  key={index}
                  className={`${theme} transition-all duration-500 ${
                    activeTweetIndex === null || activeTweetIndex === index
                      ? "opacity-100"
                      : "opacity-75" // 暗転効果を弱く
                  }`}
                  onMouseEnter={() => setActiveTweetIndex(index)}
                  onMouseLeave={() => setActiveTweetIndex(null)}
                >
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl">
                      <Tweet id={id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* マットのフッター */}
          <div
            className={`px-4 sm:px-6 py-3 flex justify-between items-center backdrop-blur-sm ${
              theme === "dark"
                ? "bg-gray-800/80 border-t border-gray-700"
                : "bg-gray-50/80 border-t border-gray-100"
            }`}
          >
            <p
              className={`text-xs sm:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              公開ツイートです
            </p>

            <div
              className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {tweetIds.length}件
            </div>
          </div>
        </div>

        <footer className="mt-10 sm:mt-16 pt-4 sm:pt-6 text-center">
          <p
            className={`text-xs sm:text-sm ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            © {new Date().getFullYear()} Meme Collection / 作成者: さだ
          </p>
        </footer>
      </div>
    </div>
  );
}

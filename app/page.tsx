"use client";

import { Tweet } from "react-tweet";
import { extractTweetId } from "../utils/tweet-utils";
import { useState, useEffect } from "react";

export default function Home() {
  // テーマの状態管理
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 初期ロード時にシステム設定とローカルストレージからテーマを取得
  useEffect(() => {
    // ローカルストレージから設定を取得
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, []);

  // テーマ切替
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 例のツイート一覧
  const tweets = [
    "https://x.com/Unknown392Z/status/1917513692163498304",
    "https://x.com/minna_followjp/status/1920783669263786213",
  ];

  // URLからIDを抽出
  const tweetIds = tweets.map((tweet) => extractTweetId(tweet));

  // 現在の日付
  const currentDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* ヘッダーを中央寄せ */}
        <header className="text-center mb-14">
          <div
            className={`inline-block mb-4 px-3 py-1 rounded-full text-xs ${
              theme === "dark"
                ? "bg-blue-900/30 text-blue-400"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {currentDate} 更新
          </div>

          <h1
            className={`text-4xl font-bold mb-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
                : "text-gray-900"
            }`}
          >
            例のミームまとめ
          </h1>

          <p
            className={`max-w-lg mx-auto mb-8 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            今ネットで話題の画像ミーム派生ツイートを集めました。
          </p>

          {/* エレガントなテーマスイッチ */}
          <div className="flex justify-center mb-10">
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                theme === "dark" ? "bg-blue-900" : "bg-gray-200"
              }`}
              aria-label={
                theme === "dark"
                  ? "ライトモードに切り替え"
                  : "ダークモードに切り替え"
              }
            >
              <span
                className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform ${
                  theme === "dark" ? "translate-x-7" : ""
                }`}
              ></span>
              <span className="sr-only">
                {theme === "dark"
                  ? "ライトモードに切り替え"
                  : "ダークモードに切り替え"}
              </span>
            </button>
          </div>
        </header>

        {/* ツイート全体を囲むマット - より洗練されたデザイン */}
        <div
          className={`rounded-xl overflow-hidden transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-700"
              : "bg-white shadow-xl border border-gray-100"
          }`}
        >
          {/* マットのヘッダー */}
          <div
            className={`p-5 ${
              theme === "dark"
                ? "border-b border-gray-700 bg-gray-800/80"
                : "border-b border-gray-100 bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                話題のツイート
              </span>
            </div>
          </div>

          {/* ツイート本体コンテンツ */}
          <div className="p-8">
            <div className="space-y-16">
              {tweetIds.map((id, index) => (
                <div key={index} className={theme}>
                  {/* 複数ツイートの間の区切り線 (最初のツイート以外に表示) */}
                  {index > 0 && (
                    <div
                      className={`my-16 border-t ${
                        theme === "dark" ? "border-gray-700" : "border-gray-100"
                      }`}
                    ></div>
                  )}

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
            className={`px-8 py-4 text-center text-sm ${
              theme === "dark"
                ? "bg-gray-800/80 border-t border-gray-700"
                : "bg-gray-50 border-t border-gray-100"
            }`}
          >
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              これらのツイートは公開されているコンテンツであり、各著作者に著作権があります。
            </p>
          </div>
        </div>

        <footer className="mt-12 pt-6 text-center">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            © {new Date().getFullYear()} Meme Collection / 作成者: しょうた
          </p>
        </footer>
      </div>
    </div>
  );
}

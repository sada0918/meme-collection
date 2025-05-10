"use client";

import { Tweet } from "react-tweet";
import { useState } from "react";
import TweetCard from "../components/TweetCard";
import { extractTweetId } from "../utils/tweet-utils";

export default function Home() {
  // ツイートURLまたはIDのリスト
  const tweets = [
    "https://x.com/Unknown392Z/status/1917513692163498304",
    "https://x.com/minna_followjp/status/1920783669263786213",
    // 他の関連ツイートURLをここに追加
  ];

  // URLからIDを抽出
  const tweetIds = tweets.map((tweet) => extractTweetId(tweet));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6">
      <header className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3 drop-shadow">
          例のミームまとめ
        </h1>
        <p className="text-gray-600 text-lg">
          今ネットで話題の画像ミーム派生ツイートを集めました。
        </p>
      </header>

      <main className="max-w-3xl mx-auto grid grid-cols-1 gap-8 bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition">
        {tweetIds.map((id, index) => (
          <div key={index}>
            {/* react-tweetコンポーネント - シンプルなAPIでツイートを表示 */}
            <Tweet id={id} />
          </div>
        ))}
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Meme Collection / 作成者: しょうた
      </footer>
    </div>
  );
}

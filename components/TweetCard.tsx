"use client";

import { useState, useEffect, useRef } from "react";
import { Tweet } from "react-tweet";

interface TweetCardProps {
  id: string;
}

const TweetCard = ({ id }: TweetCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // APIエンドポイントのパスを指定
  const apiUrl = `/api/tweet/${id}`;

  // ツイートが読み込まれたかどうかを監視
  useEffect(() => {
    if (!containerRef.current) return;

    // MutationObserverを使用してDOM変更を監視
    const observer = new MutationObserver((mutations) => {
      // ツイートが読み込まれたと判断できる要素が追加されたかチェック
      // react-tweetのDOM構造を調査し、適切なセレクタを使用
      const isTweetLoaded = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some(
          (node) =>
            node instanceof HTMLElement &&
            (node.classList.contains("react-tweet") ||
              node.querySelector("[data-tweet-id]") ||
              node.querySelector(".react-tweet-container"))
        )
      );

      // エラーメッセージの検出
      const hasErrorMessage = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some(
          (node) =>
            node instanceof HTMLElement &&
            node.textContent?.includes("Could not load tweet")
        )
      );

      if (hasErrorMessage) {
        setHasError(true);
        setIsLoading(false);
        observer.disconnect();
      }

      if (isTweetLoaded) {
        setIsLoading(false);
        observer.disconnect();
      }
    });

    // 監視の設定
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    // クリーンアップ
    return () => {
      observer.disconnect();
    };
  }, [id]);

  // タイムアウト - 一定時間後にロード中表示を非表示に
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5秒後にローディング表示を終了

    return () => clearTimeout(timer);
  }, []);

  // Tweetコンポーネントでエラーをキャッチするためのエラーバウンダリの代わり
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition">
      {isLoading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
        </div>
      )}

      {hasError && (
        <div className="text-center text-red-500 py-4">
          ツイートの読み込みに失敗しました。
          <button
            className="ml-2 text-blue-500 underline"
            onClick={() =>
              window.open(`https://twitter.com/i/status/${id}`, "_blank")
            }
          >
            Xで見る
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        className={
          isLoading || hasError
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        {!hasError && <Tweet id={id} apiUrl={apiUrl} />}
      </div>
    </div>
  );
};

export default TweetCard;

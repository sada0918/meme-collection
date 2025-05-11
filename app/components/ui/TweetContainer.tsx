import React from "react";
import { Tweet } from "react-tweet";
import LoadingSpinner from "./LoadingSpinner";
import { MemeImage, Theme } from "../../types";

interface TweetContainerProps {
  theme: Theme;
  tweetIds: string[];
  isLoading: boolean;
  selectedMemeImage: string;
  memeImages: MemeImage[];
}

/**
 * ツイート表示コンテナコンポーネント
 */
const TweetContainer: React.FC<TweetContainerProps> = ({
  theme,
  tweetIds,
  isLoading,
  selectedMemeImage,
  memeImages,
}) => {
  // 選択中の画像の情報を取得
  const selectedImage = memeImages.find((img) => img.id === selectedMemeImage);

  return (
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
            {selectedImage?.alt || "話題のツイート"}
          </span>
          <div className="ml-auto">
            <span
              className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {tweetIds.length}件
            </span>
          </div>
        </div>
      </div>

      {/* ツイート本体コンテンツ */}
      <div className="p-4 pt-2 sm:p-6">
        {isLoading ? (
          <LoadingSpinner theme={theme} />
        ) : tweetIds.length > 0 ? (
          <div className="space-y-2">
            {tweetIds.map((id, index) => (
              <div
                key={index}
                className={`${theme} transition-all duration-500`}
              >
                <div className="flex justify-center">
                  <div className="w-full max-w-xl">
                    <Tweet id={id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-8 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            関連するツイートが見つかりませんでした。別の画像を選んでみてください。
          </div>
        )}
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
  );
};

export default TweetContainer;

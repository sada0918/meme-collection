import React from "react";
import { MemeImage, Theme } from "../../types";

interface MemeImageLaneProps {
  theme: Theme;
  memeImages: MemeImage[];
  selectedMemeImage: string;
  handleImageSelect: (id: string) => void;
}

/**
 * ミーム画像選択用のレーンコンポーネント
 */
const MemeImageLane: React.FC<MemeImageLaneProps> = ({
  theme,
  memeImages,
  selectedMemeImage,
  handleImageSelect,
}) => {
  return (
    <div className="mb-8">
      <div
        className={`rounded-lg p-2 pb-1 mb-3 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h2
          className={`text-sm font-medium mt-1 mb-1 px-2 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          見たいミームの画像を選択
        </h2>
        <div className="flex overflow-x-auto pt-2 pb-3 px-1 space-x-3">
          {memeImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageSelect(image.id)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${
                selectedMemeImage === image.id
                  ? "transform scale-105"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden ${
                  selectedMemeImage === image.id
                    ? theme === "dark"
                      ? "ring-2 ring-blue-400"
                      : "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${image.src}')`,
                  }}
                  aria-label={image.alt}
                ></div>
              </div>
              {selectedMemeImage === image.id && (
                <div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                    theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeImageLane;

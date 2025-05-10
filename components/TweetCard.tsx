"use client";

import { useState } from "react";
import { Tweet } from "react-tweet";

interface TweetCardProps {
  id: string;
}

const TweetCard = ({ id }: TweetCardProps) => {
  const openExternalLink = () => {
    window.open(`https://twitter.com/i/status/${id}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition">
      <div className={"opacity-100 transition-opacity duration-300"}>
        <Tweet id={id} />
        <div className="mt-2 text-center">
          <button
            onClick={openExternalLink}
            className="text-blue-500 hover:underline text-sm"
          >
            Xで見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;

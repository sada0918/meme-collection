import { useState, useEffect } from "react";
import { MEME_IMAGES } from "../data/mockData";
import { fetchRelatedTweets } from "../services/tweetService";
import { MemeImage } from "../types";

/**
 * ミームデータの状態管理とロジックを扱うカスタムフック
 */
export const useMemeData = () => {
  const [selectedMemeImage, setSelectedMemeImage] = useState<string>("aomine");
  const [tweetIds, setTweetIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // サンプルのミーム画像一覧
  const memeImages: MemeImage[] = MEME_IMAGES;

  // 選択された画像に基づいて関連ツイートを取得
  const loadRelatedTweets = async (imageId: string) => {
    setIsLoading(true);
    try {
      const tweets = await fetchRelatedTweets(imageId);
      setTweetIds(tweets);
    } catch (error) {
      console.error("ツイートの取得に失敗しました:", error);
      setTweetIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 画像選択時の処理
  const handleImageSelect = (imageId: string) => {
    setSelectedMemeImage(imageId);
    loadRelatedTweets(imageId);
  };

  // 初期ロード時に最初の画像のツイートを取得
  useEffect(() => {
    loadRelatedTweets(selectedMemeImage);
  }, []);

  return {
    selectedMemeImage,
    tweetIds,
    isLoading,
    memeImages,
    handleImageSelect,
  };
};

"use client";

import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Header from "./components/ui/Header";
import MemeImageLane from "./components/ui/MemeImageLane";
import TweetContainer from "./components/ui/TweetContainer";
import Footer from "./components/ui/Footer";
import { useTheme } from "./hooks/useTheme";
import { useMemeData } from "./hooks/useMemeData";

/**
 * アプリケーションのメインページ
 */
export default function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // テーマ関連のフック
  const {
    theme,
    mounted: themeMounted,
    setSpecificTheme,
    bgStyle,
  } = useTheme();

  // ミームデータ関連のフック
  const {
    selectedMemeImage,
    tweetIds,
    isLoading,
    memeImages,
    handleImageSelect,
  } = useMemeData();

  // ページのロード完了状態を管理
  useEffect(() => {
    setMounted(true);
    // フェードインアニメーションのタイミング
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !themeMounted) {
    // 最初の表示時のフラッシュを防ぐためのプレースホルダー
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
  }

  return (
    <Layout theme={theme} bgStyle={bgStyle} isPageLoaded={isPageLoaded}>
      {/* ヘッダー */}
      <Header theme={theme} setSpecificTheme={setSpecificTheme} />

      {/* 画像選択レーン */}
      <MemeImageLane
        theme={theme}
        memeImages={memeImages}
        selectedMemeImage={selectedMemeImage}
        handleImageSelect={handleImageSelect}
      />

      {/* ツイート表示コンテナ */}
      <TweetContainer
        theme={theme}
        tweetIds={tweetIds}
        isLoading={isLoading}
        selectedMemeImage={selectedMemeImage}
        memeImages={memeImages}
      />

      {/* フッター */}
      <Footer theme={theme} />
    </Layout>
  );
}

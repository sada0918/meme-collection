import { MOCK_TWEET_MAPPING } from "../data/mockData";

/**
 * 関連ツイートを取得するサービス
 * 実際の実装ではAPIからデータを取得する
 */
export const fetchRelatedTweets = async (
  imageId: string
): Promise<string[]> => {
  // この関数は実際には画像IDに基づいてAPIからツイートを取得する
  // 現在はモックデータを返す

  // 少し遅延を入れて非同期処理をシミュレート
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TWEET_MAPPING[imageId] || []);
    }, 500);
  });
};

/**
 * 特定のツイートの詳細情報を取得する関数
 * 将来的に必要になるかもしれない
 */
export const fetchTweetDetails = async (tweetId: string): Promise<any> => {
  // 実際にはAPIからツイートの詳細を取得する
  // 現在は未実装
  return Promise.resolve(null);
};

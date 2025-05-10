/**
 * ツイートURLからツイートIDを抽出する関数
 *
 * @param url ツイートのURL（例: https://x.com/username/status/1234567890）または直接ツイートID
 * @returns 抽出されたツイートID
 */
export const extractTweetId = (url: string): string => {
  // すでにIDのみの場合はそのまま返す
  if (!url.includes("/")) {
    return url;
  }

  // URLの場合は最後のパスセグメントを抽出
  const segments = url.split("/");
  return segments[segments.length - 1].split("?")[0]; // クエリパラメータがある場合は除去
};

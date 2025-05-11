/**
 * 現在の日付を日本語形式で取得する
 * @returns 日本語形式の日付文字列 (例: 2025年5月11日)
 */
export const getCurrentDateJP = (): string => {
  return new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * ツイートの日付を表示用にフォーマット
 * @param dateString ツイートの日付文字列
 * @returns フォーマットされた日付
 */
export const formatTweetDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// app/api/tweet/[id]/route.ts
import { getTweet } from "react-tweet/api";
import { NextResponse } from "next/server";

// メモリ内キャッシュの実装
const tweetCache = new Map();
const CACHE_TTL = 86400 * 1000; // 24時間（ミリ秒単位）

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // キャッシュをチェック
    const cachedData = tweetCache.get(id);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      console.log(`Cache hit for tweet ${id}`);
      return NextResponse.json(cachedData.data);
    }

    // キャッシュミスまたは期限切れ - 新しいデータを取得
    console.log(`Cache miss for tweet ${id}, fetching new data`);
    const tweetResponse = await getTweet(id);

    // データ存在のチェック - 簡素化された条件
    if (!tweetResponse) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    // キャッシュに保存
    tweetCache.set(id, {
      data: tweetResponse,
      timestamp: Date.now(),
    });

    return NextResponse.json(tweetResponse);
  } catch (error) {
    console.error(`Error processing tweet ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch tweet" },
      { status: 500 }
    );
  }
}

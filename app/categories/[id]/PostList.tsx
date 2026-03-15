"use client";

import { useEffect } from "react";
import type { Post } from "@/app/types";

export default function PostList({
  posts,
  embeddedPosts,
}: {
  posts: Post[];
  embeddedPosts: (string | undefined)[];
}) {
  useEffect(() => {
    // scriptを読み込み
    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    document.body.appendChild(script);
    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {posts.map((post, index) => {
        const html = embeddedPosts[index];
        if (html === undefined) return null;
        return <div key={post.id} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

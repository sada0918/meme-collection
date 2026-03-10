## 開発

```bash
# ローカルサーバー起動
npm run dev

# ビルド確認
npm run build
```

## Prisma

```bash
# スキーマからDBにテーブルを作成・更新
npx prisma migrate dev --name {コミットメッセージ}

# Prisma Clientを生成
npx prisma generate

# シードデータを投入
npx prisma db seed

# DBの中身をGUIで確認
npx prisma studio
```

## Vercel

```bash
# Vercelにログイン
vercel login

# 環境変数をローカルに落とす
vercel env pull .env.local
```

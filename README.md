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

# マイグレーションの履歴(失敗)を解決済みにする方法（スキーマは更新できているが、履歴上では失敗となってしまった場合に有効）
npx prisma migrate resolve --applied {マイグレーション名}

# マイグレーションの履歴をロールバックする方法（スキーマは更新に失敗したが、履歴上では成功となってしまった場合に有効）
npx prisma migrate resolve --rolled-back {マイグレーション名}

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

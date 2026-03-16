export function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    return process.env.DATABASE_URL_TEST;
  }
  // VercelのPreview環境とローカル開発環境の両方でDATABASE_URL_DEVを使用する。
  // VERCEL_ENVを使っている理由は、VercelのPreview環境のNODE_ENVがproductionになってしまうため。
  if (process.env.VERCEL_ENV === "preview") {
    return process.env.DATABASE_URL_DEV;
  }
  if (process.env.NODE_ENV === "development") {
    return process.env.DATABASE_URL_DEV;
  }
  return process.env.DATABASE_URL;
}

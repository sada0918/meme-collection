export function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    return process.env.DATABASE_URL_TEST;
  }
  if (process.env.NODE_ENV === "development") {
    return process.env.DATABASE_URL_DEV;
  }
  return process.env.DATABASE_URL;
}

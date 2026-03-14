export default async function Page() {
  return (
    <div>
      <h1>管理者トップページ</h1>
      <ul>
        <li>
          <a href="/admin/categories">カテゴリ管理</a>
          <a href="/admin/posts" style={{ marginLeft: "1rem" }}>
            ポスト管理
          </a>
        </li>
      </ul>
    </div>
  );
}

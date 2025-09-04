// app/page.tsx
"use client";

import { useState } from "react";

type User = { id: number; name: string; email: string };

export default function Page() {
  const [users] = useState<User[]>([]);
  const [q, setQ] = useState("");
  const [loading] = useState(false);
  const [err] = useState<string | null>(null);

  const [creating] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");

  const [upserting] = useState(false);
  const [upsertId, setUpsertId] = useState<number>(4);
  const [upsertName, setUpsertName] = useState("");
  const [upsertEmail, setUpsertEmail] = useState("");

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "40px auto",
        padding: 16,
        lineHeight: 1.6,
      }}
    >
      <h1>Frontend Coding Interview Sandbox</h1>

      <section
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <details open>
          <summary style={{ fontWeight: 600 }}>
            必須課題（候補者に見せる想定 / TODO印つき）
          </summary>
          <ol>
            <li>
              <b>一覧表示</b>：ユーザー（id, name, email）をテーブル表示（
              <code>GET /api/users</code>）。
            </li>
            <li>
              <b>検索</b>：検索入力で絞り込み（デバウンス済み）。
            </li>
            <li>
              <b>作成</b>：name/email を入力して作成（
              <code>POST /api/users</code>）。二重送信防止。
            </li>
            <li>
              （任意）<b>UI改善</b>
              ：ローディング表示、アクセシビリティ、フォームバリデーション。
              </li><li>
              （任意）<b>UPSERT</b>：id を指定して「無ければ作成・あれば更新」（
              <code>PUT /api/users?id=</code>）。
            </li>
          </ol>
        </details>
      </section>

      <section style={{ marginTop: 24 }}>
        <label>検索: </label>
        <input
          placeholder="name / email"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, width: 260 }}
        />
      </section>

      <section style={{ marginTop: 12 }}>
        {loading && <p>Loading...</p>}
        {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>
                名前
              </th>
              <th style={th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={td}>{u.id}</td>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.email}</td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={3} style={td}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <hr style={{ margin: "24px 0" }} />

      <section
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
      >
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <h3>作成（POST /api/users）</h3>
          <div style={row}>
            <label style={lab}>Name</label>
            <input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              style={inp}
            />
          </div>
          <div style={row}>
            <label style={lab}>Email</label>
            <input
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
              style={inp}
            />
          </div>
          <button
            disabled={creating || !createName || !createEmail}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
          <h3>UPSERT（PUT /api/users?id=ID）</h3>
          <div style={row}>
            <label style={lab}>ID</label>
            <input
              type="number"
              value={upsertId}
              onChange={(e) => setUpsertId(Number(e.target.value))}
              style={inp}
            />
          </div>
          <div style={row}>
            <label style={lab}>Name</label>
            <input
              value={upsertName}
              onChange={(e) => setUpsertName(e.target.value)}
              style={inp}
            />
          </div>
          <div style={row}>
            <label style={lab}>Email</label>
            <input
              value={upsertEmail}
              onChange={(e) => setUpsertEmail(e.target.value)}
              style={inp}
            />
          </div>
          <button
            disabled={upserting || !upsertName || !upsertEmail}
          >
            {upserting ? "Upserting..." : "Upsert"}
          </button>
        </div>
      </section>
    </main>
  );
}
const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  padding: "8px 6px",
};
const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px 6px",
};
const row: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "80px 1fr",
  gap: 8,
  alignItems: "center",
  marginBottom: 8,
};
const lab: React.CSSProperties = { color: "#444" };
const inp: React.CSSProperties = { padding: 8, width: "100%" };


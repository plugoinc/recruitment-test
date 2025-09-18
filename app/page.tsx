// app/page.tsx
"use client";

import { useState } from "react";

type User = { id: number; name: string; email: string };

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");

  const [upserting, setUpserting] = useState(false);
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
          <ol>
            <li>
              <b>一覧表示</b>：ユーザー（id, name, email）をテーブル表示（
              <code>GET /api/users</code>）。
            </li>
            <li>
              <b>検索</b>：検索入力で絞り込み
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
              <th style={th}>名前</th>
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

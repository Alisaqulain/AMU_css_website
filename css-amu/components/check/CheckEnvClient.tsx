"use client";

import { useState } from "react";

type CheckResponse = {
  ok: boolean;
  envReady: boolean;
  database: { ok: boolean; message: string };
  checkedAt: string;
};

export default function CheckEnvClient({
  initialEnvReady,
}: {
  initialEnvReady: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [error, setError] = useState("");

  const runCheck = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/check");
      const data = await res.json();
      if (!res.ok) {
        setError("Check request failed.");
        return;
      }
      setResult(data as CheckResponse);
    } catch {
      setError("Could not reach /api/check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-[#25297F]">Live API test</h2>
      <p className="mt-2 text-sm text-slate-600">
        Calls <code className="rounded bg-slate-100 px-1">GET /api/check</code> to
        verify Supabase with the anon key (read one row from{" "}
        <code className="rounded bg-slate-100 px-1">events</code>).
      </p>

      <button
        type="button"
        onClick={runCheck}
        disabled={loading || !initialEnvReady}
        className="mt-5 rounded-xl bg-[#3035B5] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Checking…" : "Run database check"}
      </button>

      {!initialEnvReady && (
        <p className="mt-3 text-sm text-[#CC484A]">
          Fix missing env vars in <code>.env.local</code> and restart{" "}
          <code>npm run dev</code>.
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm font-medium text-[#CC484A]">{error}</p>
      )}

      {result && (
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold text-slate-700">Overall:</span>{" "}
            <span className={result.ok ? "text-[#3CA049]" : "text-[#CC484A]"}>
              {result.ok ? "OK" : "Failed"}
            </span>
          </p>
          <p className="text-slate-600">
            <span className="font-semibold text-slate-700">Database:</span>{" "}
            {result.database.message}
          </p>
          <p className="text-xs text-slate-400">
            Checked at {new Date(result.checkedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

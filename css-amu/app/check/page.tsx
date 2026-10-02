import Link from "next/link";
import CheckEnvClient from "@/components/check/CheckEnvClient";
import { allRequiredEnvConfigured, getEnvVarStatus } from "@/lib/env-check";

export const metadata = {
  title: "Environment check | CSS AMU",
  robots: { index: false, follow: false },
};

export default function CheckPage() {
  const variables = getEnvVarStatus();
  const envReady = allRequiredEnvConfigured();

  return (
    <div className="min-h-[70vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
          Diagnostics
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#25297F]">
          Environment check
        </h1>
        <p className="mt-3 text-slate-600 leading-7">
          Confirms <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">.env.local</code>{" "}
          variables are loaded. Secret values are never shown.
        </p>

        <div
          className={`mt-8 rounded-2xl border px-5 py-4 ${
            envReady
              ? "border-[#3CA049]/40 bg-[#3CA049]/10 text-[#2d7a38]"
              : "border-[#E1A65E]/40 bg-[#E1A65E]/15 text-[#8a5f1f]"
          }`}
        >
          <p className="font-semibold">
            {envReady
              ? "All required variables are set on the server."
              : "Some required variables are missing on the server."}
          </p>
        </div>

        <ul className="mt-6 space-y-2">
          {variables.map((v) => (
            <li
              key={v.name}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <span className="font-mono text-slate-800">{v.name}</span>
              <span
                className={`font-semibold ${
                  v.configured ? "text-[#3CA049]" : "text-[#CC484A]"
                }`}
              >
                {v.configured ? "Set" : "Missing"}
              </span>
            </li>
          ))}
        </ul>

        <CheckEnvClient initialEnvReady={envReady} />

        <Link
          href="/"
          className="mt-10 inline-block text-sm font-semibold text-[#3035B5] hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

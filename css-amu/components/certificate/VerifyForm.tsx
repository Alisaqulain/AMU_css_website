"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  certificatePath,
  dayLabel,
  looksLikeCertificateSerial,
  normalizeCertificateSerial,
} from "@/lib/cs360";

type Result = {
  serial: string;
  name: string;
  label: string;
  day_position: string;
  status: string;
  created_at: string;
};

function formatIssued(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  });
}

export default function VerifyForm() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `/api/certificate/verify?q=${encodeURIComponent(query.trim())}`,
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not verify.");
        return;
      }
      const list = (data.certificates ?? []) as Result[];
      if (list.length === 0) {
        setError(
          looksLikeCertificateSerial(query)
            ? "No certificate exists with this serial number. It is not a genuine CSS AMU certificate."
            : "No certificate found for that name. Check the spelling or try the serial number printed on the certificate.",
        );
        return;
      }
      if (
        list.length === 1 &&
        list[0].serial === normalizeCertificateSerial(query)
      ) {
        router.push(certificatePath(list[0].serial));
        return;
      }
      setResults(list);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
      >
        <h2 className="text-xl font-bold text-[#25297F]">
          Verify a certificate
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Enter the full name on the certificate, or its serial number (e.g.{" "}
          <span className="font-mono">CSS-7K2MQ9XA</span>).
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            minLength={2}
            placeholder="Full name or serial number"
            className="w-full flex-1 rounded-2xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#3035B5] focus:ring-4 focus:ring-[#3035B5]/10"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-[#3035B5] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#25297F] disabled:opacity-60"
          >
            {loading ? "Checking…" : "Verify"}
          </button>
        </div>
        {error && (
          <p className="mt-4 rounded-xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-4 py-3 text-sm text-[#a33a3c]">
            {error}
          </p>
        )}
      </motion.form>

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            {results.length === 1
              ? "1 certificate found."
              : `${results.length} certificates found.`}
          </p>
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.serial}>
                <Link
                  href={certificatePath(r.serial)}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:border-[#3035B5]/40"
                >
                  <div>
                    <p className="font-semibold text-[#25297F]">{r.name}</p>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {r.label} · {dayLabel(r.day_position)} day · Issued{" "}
                      {formatIssued(r.created_at)}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-slate-500">
                      {r.serial}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      r.status === "valid"
                        ? "bg-[#3CA049]/15 text-[#2d7a38]"
                        : "bg-[#CC484A]/15 text-[#a33a3c]"
                    }`}
                  >
                    {r.status === "valid" ? "Genuine" : "Revoked"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

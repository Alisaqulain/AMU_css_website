"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CLUB_OPTIONS } from "@/lib/clubs";

type EventRow = {
  id: string;
  title: string;
  description: string;
  year: string;
  is_coming_soon: boolean;
  created_at: string;
};

type InterestRow = {
  id: string;
  name: string;
  course: string;
  enrollment_number: string;
  semester: string;
  club_name: string;
  club_names: string[] | null;
  not_interested: boolean | null;
  other_club: string | null;
  created_at: string;
};

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"events" | "interests">("events");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [interests, setInterests] = useState<InterestRow[]>([]);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    is_coming_soon: false,
  });
  const [message, setMessage] = useState("");
  const [interestsError, setInterestsError] = useState("");

  const loadData = useCallback(async () => {
    const [evRes, intRes] = await Promise.all([
      fetch("/api/admin/events"),
      fetch("/api/admin/club-interests"),
    ]);

    if (evRes.status === 401 || intRes.status === 401) {
      setAuthed(false);
      return;
    }

    setAuthed(true);
    const evData = await evRes.json();
    const intData = await intRes.json();
    setEvents(evData.events ?? []);
    setInterests(intData.interests ?? []);
    setInterestsError(
      typeof intData.error === "string"
        ? intData.error
        : intRes.status === 503
          ? "Could not load club interest submissions."
          : ""
    );
  }, []);

  useEffect(() => {
    loadData().finally(() => setChecking(false));
  }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error ?? "Login failed.");
      return;
    }
    setPassword("");
    await loadData();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setEvents([]);
    setInterests([]);
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not add event.");
      return;
    }
    setEventForm({
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      is_coming_soon: false,
    });
    setMessage("Event added.");
    await loadData();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    await loadData();
  };

  if (checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-[#25297F]">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage events and view club interest submissions.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#3035B5] focus:ring-2 focus:ring-[#3035B5]/15"
          required
        />
        {loginError && (
          <p className="mt-3 text-sm text-[#CC484A]">{loginError}</p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#3035B5] py-3 text-sm font-semibold text-white hover:bg-[#25297F]"
        >
          Sign in
        </button>
      </motion.form>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#25297F]">CSS Admin</h1>
          <p className="mt-1 text-sm text-slate-600">Events & club interest data</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>

      <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
        {(["events", "interests"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition ${
              tab === t
                ? "bg-white text-[#3035B5] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t === "events" ? "Events" : "Club interests"}
          </button>
        ))}
      </div>

      {message && (
        <p className="rounded-lg bg-[#3CA049]/10 px-4 py-2 text-sm text-[#2d7a38]">
          {message}
        </p>
      )}

      {tab === "events" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={addEvent}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#25297F]">Add event</h2>
            <div className="mt-4 space-y-4">
              <input
                required
                placeholder="Event title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#3035B5]"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#3035B5]"
              />
              <input
                placeholder="Year"
                value={eventForm.year}
                onChange={(e) =>
                  setEventForm((f) => ({ ...f, year: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#3035B5]"
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={eventForm.is_coming_soon}
                  onChange={(e) =>
                    setEventForm((f) => ({
                      ...f,
                      is_coming_soon: e.target.checked,
                    }))
                  }
                  className="accent-[#3035B5]"
                />
                Mark as Coming Soon
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-[#3035B5] py-2.5 text-sm font-semibold text-white hover:bg-[#25297F]"
            >
              Publish event
            </button>
          </form>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-[#25297F]">
                    {ev.title}{" "}
                    {ev.is_coming_soon && (
                      <span className="text-xs font-medium text-[#b87d2e]">
                        (Coming soon)
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                    {ev.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{ev.year}</p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteEvent(ev.id)}
                  className="shrink-0 text-sm text-[#CC484A] hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "interests" && interestsError && (
        <div className="mb-4 rounded-xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
          {interestsError}
        </div>
      )}

      {tab === "interests" && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Enrollment</th>
                <th className="px-4 py-3">Sem</th>
                <th className="px-4 py-3">Clubs</th>
                <th className="px-4 py-3">Other club</th>
                <th className="px-4 py-3">Date & time (IST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {interests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    {interestsError
                      ? "Fix the server configuration above, then refresh."
                      : "No submissions yet."}
                  </td>
                </tr>
              ) : (
                interests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium text-[#25297F]">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.course}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.enrollment_number}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.semester || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {row.not_interested ? (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          Not interested
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {(row.club_names?.length
                            ? row.club_names
                            : row.club_name.split(", ")
                          ).map((club) => (
                            <span
                              key={club}
                              className="rounded-full bg-[#3035B5]/10 px-2 py-0.5 text-xs font-semibold text-[#3035B5]"
                            >
                              {club}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {row.other_club || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {formatSubmittedAt(row.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-400">
            Clubs: {CLUB_OPTIONS.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CLUB_OPTIONS } from "@/lib/clubs";
import { computeClubInterestStats } from "@/lib/admin-interest-stats";
import {
  CS360_DAY_OPTIONS,
  certificatePath,
  dayLabel,
  type Cs360Day,
  type IssuedCertificateStatus,
} from "@/lib/cs360";
import {
  exportCertificatesCsv,
  exportCertificatesPdf,
  exportClubInterestsCsv,
  exportClubInterestsPdf,
  exportContactCsv,
  exportContactPdf,
  exportTeamApplicationsCsv,
  exportTeamApplicationsPdf,
} from "@/lib/admin-export";

type EventRow = {
  id: string;
  title: string;
  description: string;
  year: string;
  is_coming_soon: boolean;
  image_url?: string | null;
  created_at: string;
};

type InterestRow = {
  id: string;
  name: string;
  course: string;
  enrollment_number: string;
  phone_number: string;
  semester: string;
  club_name: string;
  club_names: string[] | null;
  not_interested: boolean | null;
  other_club: string | null;
  created_at: string;
};

type TeamRow = {
  id: string;
  name: string;
  course: string;
  enrollment_number: string;
  phone_number: string;
  semester: string;
  club_name: string;
  club_names: string[] | null;
  not_interested: boolean | null;
  other_club: string | null;
  resume_url: string | null;
  resume_filename: string | null;
  created_at: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type IssuedCertRow = {
  id: string;
  serial: string;
  name: string;
  enrollment_number: string | null;
  course: string | null;
  label: string;
  day_position: string;
  status: string;
  created_at: string;
};

type Recipient = {
  name: string;
  enrollment_number: string;
  course: string;
};

/** One recipient per line: "Name" or "Name, Enrollment, Course" */
function parseRecipientLines(text: string): Recipient[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", enrollment = "", ...course] = line
        .split(",")
        .map((part) => part.trim());
      return {
        name,
        enrollment_number: enrollment,
        course: course.join(", "),
      };
    });
}

function certificateUrl(serial: string) {
  return `${window.location.origin}${certificatePath(serial)}`;
}

type AdminTab =
  | "events"
  | "interests"
  | "team"
  | "certificates"
  | "contact";

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

function ExportButtons({
  disabled,
  onCsv,
  onPdf,
}: {
  disabled: boolean;
  onCsv: () => void;
  onPdf: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={onCsv}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        Download Excel (CSV)
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onPdf}
        className="rounded-lg border border-[#3035B5]/30 bg-[#3035B5]/5 px-3 py-1.5 text-xs font-semibold text-[#3035B5] hover:bg-[#3035B5]/10 disabled:opacity-50"
      >
        Download PDF
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<AdminTab>("events");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [interests, setInterests] = useState<InterestRow[]>([]);
  const [teamApps, setTeamApps] = useState<TeamRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [certificates, setCertificates] = useState<IssuedCertRow[]>([]);
  const [certSearch, setCertSearch] = useState("");
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    is_coming_soon: false,
  });
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [certForm, setCertForm] = useState<{
    mode: "single" | "bulk";
    day_position: Cs360Day;
    label: string;
    name: string;
    enrollment_number: string;
    course: string;
    bulk: string;
  }>({
    mode: "single",
    day_position: "first",
    label: "CS360 4.0",
    name: "",
    enrollment_number: "",
    course: "",
    bulk: "",
  });
  const [issuedCerts, setIssuedCerts] = useState<IssuedCertRow[]>([]);
  const [issuing, setIssuing] = useState(false);
  const [message, setMessage] = useState("");
  const [interestsError, setInterestsError] = useState("");
  const [teamError, setTeamError] = useState("");
  const [contactsError, setContactsError] = useState("");
  const [certsError, setCertsError] = useState("");

  const loadData = useCallback(async () => {
    const sessionRes = await fetch("/api/admin/session", {
      credentials: "same-origin",
    });
    const sessionData = await sessionRes.json().catch(() => ({}));
    if (!sessionData.authenticated) {
      setAuthed(false);
      return;
    }

    setAuthed(true);

    const [evRes, intRes, teamRes, contactRes, certRes] = await Promise.all([
      fetch("/api/admin/events", { credentials: "same-origin" }),
      fetch("/api/admin/club-interests", { credentials: "same-origin" }),
      fetch("/api/admin/team-applications", { credentials: "same-origin" }),
      fetch("/api/admin/contact-messages", { credentials: "same-origin" }),
      fetch("/api/admin/certificates", { credentials: "same-origin" }),
    ]);

    if (
      evRes.status === 401 ||
      intRes.status === 401 ||
      contactRes.status === 401
    ) {
      setAuthed(false);
      return;
    }

    const evData = await evRes.json();
    const intData = await intRes.json();
    const teamData = await teamRes.json().catch(() => ({}));
    const contactData = await contactRes.json();
    const certData = await certRes.json().catch(() => ({}));

    setEvents(evData.events ?? []);
    setInterests(intData.interests ?? []);
    setTeamApps(teamData.applications ?? []);
    setContacts(contactData.messages ?? []);
    setCertificates(certData.certificates ?? []);
    setInterestsError(
      typeof intData.error === "string"
        ? intData.error
        : intRes.status === 503
          ? "Could not load club interest submissions."
          : "",
    );
    setTeamError(
      typeof teamData.error === "string"
        ? teamData.error
        : teamRes.status === 503
          ? "Could not load team applications."
          : "",
    );
    setContactsError(
      typeof contactData.error === "string"
        ? contactData.error
        : contactRes.status === 503
          ? "Could not load contact messages."
          : "",
    );
    setCertsError(
      typeof certData.error === "string" ? certData.error : "",
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
      credentials: "same-origin",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error ?? "Login failed.");
      return;
    }
    setPassword("");
    setAuthed(true);
    await loadData();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setAuthed(false);
    setEvents([]);
    setInterests([]);
    setTeamApps([]);
    setContacts([]);
    setCertificates([]);
    setIssuedCerts([]);
  };

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const body = new FormData();
    body.set("title", eventForm.title);
    body.set("description", eventForm.description);
    body.set("year", eventForm.year);
    body.set("is_coming_soon", String(eventForm.is_coming_soon));
    if (eventImage) body.set("image", eventImage);

    const res = await fetch("/api/admin/events", {
      method: "POST",
      body,
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
    setEventImage(null);
    setMessage("Event added.");
    await loadData();
  };

  const issueCertificates = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIssuedCerts([]);

    const recipients =
      certForm.mode === "single"
        ? [
            {
              name: certForm.name,
              enrollment_number: certForm.enrollment_number,
              course: certForm.course,
            },
          ]
        : parseRecipientLines(certForm.bulk);

    if (recipients.length === 0) {
      setMessage("Add at least one name.");
      return;
    }

    setIssuing(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day_position: certForm.day_position,
          label: certForm.label,
          recipients,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error ?? "Could not create certificates.");
        return;
      }
      const created = (data.certificates ?? []) as IssuedCertRow[];
      setIssuedCerts(created);
      setCertForm((f) => ({
        ...f,
        name: "",
        enrollment_number: "",
        course: "",
        bulk: "",
      }));
      setMessage(
        `${created.length} certificate${created.length === 1 ? "" : "s"} issued for ${dayLabel(certForm.day_position)} day.`,
      );
      await loadData();
    } finally {
      setIssuing(false);
    }
  };

  const updateCertificateStatus = async (
    id: string,
    status: IssuedCertificateStatus,
  ) => {
    const res = await fetch("/api/admin/certificates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error ?? "Could not update status.");
      return;
    }
    setMessage(
      status === "revoked"
        ? "Certificate revoked. Verification will now show it as not valid."
        : "Certificate restored.",
    );
    await loadData();
  };

  const copyCertificateLink = async (serial: string) => {
    try {
      await navigator.clipboard.writeText(certificateUrl(serial));
      setMessage(`Link for ${serial} copied.`);
    } catch {
      setMessage(certificateUrl(serial));
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    await loadData();
  };

  const deleteInterest = async (id: string) => {
    if (!confirm("Delete this club interest row?")) return;
    const res = await fetch(`/api/admin/club-interests?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error ?? "Could not delete row.");
      return;
    }
    await loadData();
  };

  const deleteTeam = async (id: string) => {
    if (!confirm("Delete this team application?")) return;
    const res = await fetch(`/api/admin/team-applications?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error ?? "Could not delete application.");
      return;
    }
    await loadData();
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact message?")) return;
    const res = await fetch(`/api/admin/contact-messages?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error ?? "Could not delete message.");
      return;
    }
    await loadData();
  };

  const deleteCertificate = async (row: IssuedCertRow) => {
    if (
      !confirm(
        `Delete certificate ${row.serial} for ${row.name}? Its link will stop verifying. Use Revoke instead to keep a record.`,
      )
    )
      return;
    const res = await fetch(`/api/admin/certificates?id=${row.id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error ?? "Could not delete certificate.");
      return;
    }
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
          Manage events, team apps, certificates, and contact messages.
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

  const interestStats = computeClubInterestStats(interests);

  const tabLabels: { id: AdminTab; label: string }[] = [
    { id: "events", label: "Events" },
    { id: "certificates", label: "Certificates" },
    { id: "interests", label: "Club interests" },
    { id: "team", label: "Team apps" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#25297F]">CSS Admin</h1>
          <p className="mt-1 text-sm text-slate-600">
            Events, certificates, club & team applications
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-[#CC484A]/40 bg-white px-4 py-2 text-sm font-semibold text-[#CC484A] hover:bg-[#CC484A]/5"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1">
        {tabLabels.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-w-[6.5rem] flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
              tab === id
                ? "bg-white text-[#3035B5] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
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
              <label className="block text-sm font-medium text-slate-700">
                Cover image (optional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEventImage(e.target.files?.[0] ?? null)
                  }
                  className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#3035B5] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                />
              </label>
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
                <div className="flex gap-3">
                  {ev.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ev.image_url}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : null}
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

      {tab === "certificates" && (
        <div className="space-y-8">
          {certsError && (
            <div className="rounded-xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
              {certsError} Run{" "}
              <code className="text-xs">issued_certificates_serial.sql</code>{" "}
              in Supabase if needed.
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <form
              onSubmit={issueCertificates}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-[#25297F]">
                Issue certificates
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Each certificate gets a unique serial number and link. Anyone
                can check it at <code className="text-xs">/certificate</code>.
              </p>

              <div className="mt-4 flex gap-1 rounded-lg bg-slate-100 p-1">
                {(["single", "bulk"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCertForm((f) => ({ ...f, mode }))}
                    className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${
                      certForm.mode === mode
                        ? "bg-white text-[#3035B5] shadow-sm"
                        : "text-slate-600"
                    }`}
                  >
                    {mode === "single" ? "One person" : "Many people"}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Workshop day
                  <select
                    value={certForm.day_position}
                    onChange={(e) =>
                      setCertForm((f) => ({
                        ...f,
                        day_position: e.target.value as Cs360Day,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                  >
                    {CS360_DAY_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {dayLabel(d)} day
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  placeholder="Label (default CS360 4.0)"
                  value={certForm.label}
                  onChange={(e) =>
                    setCertForm((f) => ({ ...f, label: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />

                {certForm.mode === "single" ? (
                  <>
                    <input
                      placeholder="Full name (as printed on certificate)"
                      value={certForm.name}
                      onChange={(e) =>
                        setCertForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                      minLength={2}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                    />
                    <input
                      placeholder="Enrollment number (optional)"
                      value={certForm.enrollment_number}
                      onChange={(e) =>
                        setCertForm((f) => ({
                          ...f,
                          enrollment_number: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                    />
                    <input
                      placeholder="Course (optional)"
                      value={certForm.course}
                      onChange={(e) =>
                        setCertForm((f) => ({ ...f, course: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                    />
                  </>
                ) : (
                  <label className="block text-sm font-medium text-slate-700">
                    One person per line:{" "}
                    <span className="font-normal text-slate-500">
                      Name, Enrollment, Course (last two optional)
                    </span>
                    <textarea
                      value={certForm.bulk}
                      onChange={(e) =>
                        setCertForm((f) => ({ ...f, bulk: e.target.value }))
                      }
                      required
                      rows={8}
                      placeholder={
                        "Ali Saqlain Zaidi, 22CSB123, B.Tech CSE\nSara Khan"
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 font-mono text-xs"
                    />
                    <span className="mt-1 block text-xs font-normal text-slate-500">
                      {parseRecipientLines(certForm.bulk).length} name(s)
                    </span>
                  </label>
                )}
              </div>
              <button
                type="submit"
                disabled={issuing}
                className="mt-5 w-full rounded-xl bg-[#3035B5] py-2.5 text-sm font-semibold text-white hover:bg-[#25297F] disabled:opacity-60"
              >
                {issuing ? "Issuing…" : "Issue certificate(s)"}
              </button>
            </form>

            {issuedCerts.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-[#25297F]">Just issued</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Share each link with the recipient. They can view and
                  download their certificate there.
                </p>
                <ul className="mt-4 max-h-96 space-y-2 overflow-y-auto">
                  {issuedCerts.map((c) => (
                    <li
                      key={c.id}
                      className="rounded-lg border border-slate-100 px-3 py-2 text-sm"
                    >
                      <p className="font-medium text-[#25297F]">{c.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
                        <a
                          href={certificatePath(c.serial)}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono font-semibold text-[#3035B5] hover:underline"
                        >
                          {c.serial}
                        </a>
                        <button
                          type="button"
                          onClick={() => copyCertificateLink(c.serial)}
                          className="font-semibold text-slate-600 hover:underline"
                        >
                          Copy link
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#25297F]">
                All certificates ({certificates.length})
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  placeholder="Search name, serial, enrollment"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs"
                />
                <ExportButtons
                  disabled={certificates.length === 0}
                  onCsv={() =>
                    exportCertificatesCsv(
                      certificates,
                      formatSubmittedAt,
                      dayLabel,
                      certificateUrl,
                    )
                  }
                  onPdf={() =>
                    exportCertificatesPdf(
                      certificates,
                      formatSubmittedAt,
                      dayLabel,
                    )
                  }
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Serial</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Enrollment</th>
                    <th className="px-4 py-3">Day</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Issued (IST)</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(() => {
                    const q = certSearch.trim().toLowerCase();
                    const rows = q
                      ? certificates.filter((c) =>
                          [c.serial, c.name, c.enrollment_number ?? ""].some(
                            (v) => v.toLowerCase().includes(q),
                          ),
                        )
                      : certificates;
                    if (rows.length === 0) {
                      return (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-8 text-center text-slate-500"
                          >
                            {certificates.length === 0
                              ? "No certificates issued yet."
                              : "No certificates match your search."}
                          </td>
                        </tr>
                      );
                    }
                    return rows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-[#25297F]">
                          <a
                            href={certificatePath(row.serial)}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {row.serial}
                          </a>
                        </td>
                        <td className="px-4 py-3 font-medium text-[#25297F]">
                          {row.name}
                        </td>
                        <td className="px-4 py-3">
                          {row.enrollment_number ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          {dayLabel(row.day_position)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              row.status === "valid"
                                ? "bg-[#3CA049]/15 text-[#2d7a38]"
                                : "bg-[#CC484A]/15 text-[#a33a3c]"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">
                          {formatSubmittedAt(row.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => copyCertificateLink(row.serial)}
                              className="text-xs font-semibold text-[#3035B5] hover:underline"
                            >
                              Copy link
                            </button>
                            {row.status === "valid" ? (
                              <button
                                type="button"
                                onClick={() =>
                                  updateCertificateStatus(row.id, "revoked")
                                }
                                className="text-xs font-semibold text-[#a33a3c] hover:underline"
                              >
                                Revoke
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  updateCertificateStatus(row.id, "valid")
                                }
                                className="text-xs font-semibold text-[#2d7a38] hover:underline"
                              >
                                Restore
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteCertificate(row)}
                              className="text-xs text-[#CC484A] hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "interests" && (
        <>
          {interestsError && (
            <div className="rounded-xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
              {interestsError}
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </p>
              <p className="mt-1 text-2xl font-bold text-[#25297F]">
                {interestStats.total}
              </p>
            </div>
            {CLUB_OPTIONS.map((club) => (
              <div
                key={club}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {club}
                </p>
                <p className="mt-1 text-2xl font-bold text-[#3035B5]">
                  {interestStats.clubCounts[club]}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-[#5B2D91]/25 bg-[#5B2D91]/5 p-4 shadow-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#5B2D91]">
                Multiple clubs
              </p>
              <p className="mt-1 text-2xl font-bold text-[#5B2D91]">
                {interestStats.multipleClubs}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              {interests.length} submission{interests.length === 1 ? "" : "s"}
            </p>
            <ExportButtons
              disabled={interests.length === 0}
              onCsv={() =>
                exportClubInterestsCsv(interests, formatSubmittedAt)
              }
              onPdf={() =>
                exportClubInterestsPdf(interests, formatSubmittedAt)
              }
            />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Enrollment</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Sem</th>
                  <th className="px-4 py-3">Clubs</th>
                  <th className="px-4 py-3">Other club</th>
                  <th className="px-4 py-3">Date & time (IST)</th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {interests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No submissions yet.
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
                        {row.phone_number || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.semester || "-"}
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
                        {row.other_club || "-"}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {formatSubmittedAt(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => deleteInterest(row.id)}
                          className="text-sm text-[#CC484A] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "team" && (
        <>
          {teamError && (
            <div className="rounded-xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
              {teamError}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              {teamApps.length} application{teamApps.length === 1 ? "" : "s"}
            </p>
            <ExportButtons
              disabled={teamApps.length === 0}
              onCsv={() =>
                exportTeamApplicationsCsv(teamApps, formatSubmittedAt)
              }
              onPdf={() =>
                exportTeamApplicationsPdf(teamApps, formatSubmittedAt)
              }
            />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Enrollment</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Sem</th>
                  <th className="px-4 py-3">Clubs</th>
                  <th className="px-4 py-3">Resume</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamApps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No team applications yet.
                    </td>
                  </tr>
                ) : (
                  teamApps.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-medium text-[#25297F]">
                        {row.name}
                      </td>
                      <td className="px-4 py-3">{row.course}</td>
                      <td className="px-4 py-3">{row.enrollment_number}</td>
                      <td className="px-4 py-3">{row.phone_number || "-"}</td>
                      <td className="px-4 py-3">{row.semester || "-"}</td>
                      <td className="px-4 py-3">{row.club_name}</td>
                      <td className="px-4 py-3">
                        {row.resume_url ? (
                          <a
                            href={`/api/admin/team-applications/resume?id=${row.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#3035B5] hover:underline"
                          >
                            {row.resume_filename || "Download resume"}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {formatSubmittedAt(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => deleteTeam(row.id)}
                          className="text-sm text-[#CC484A] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "contact" && (
        <>
          {contactsError && (
            <div className="rounded-xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
              {contactsError}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              {contacts.length} message{contacts.length === 1 ? "" : "s"}
            </p>
            <ExportButtons
              disabled={contacts.length === 0}
              onCsv={() => exportContactCsv(contacts, formatSubmittedAt)}
              onPdf={() => exportContactPdf(contacts, formatSubmittedAt)}
            />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date & time (IST)</th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  contacts.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-medium text-[#25297F]">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.email}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.subject || "-"}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">
                        <p className="line-clamp-3 whitespace-pre-wrap">
                          {row.message}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                        {formatSubmittedAt(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => deleteContact(row.id)}
                          className="text-sm text-[#CC484A] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  CLUB_OPTIONS,
  NOT_INTERESTED_LABEL,
  type ClubName,
} from "@/lib/clubs";

const clubEnum = z.enum(CLUB_OPTIONS);

const clubInterestSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    course: z.string().trim().min(2, "Please enter your course."),
    enrollment_number: z
      .string()
      .trim()
      .min(2, "Please enter your enrollment number."),
    semester: z
      .string()
      .trim()
      .min(1, "Please enter your semester.")
      .max(30, "Semester is too long."),
    club_names: z.array(clubEnum),
    not_interested: z.boolean(),
    other_club: z.string().trim().max(300).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.not_interested) {
      if (data.club_names.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: "Remove club selections or uncheck not interested.",
          path: ["club_names"],
        });
      }
      return;
    }
    if (data.club_names.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one club, or choose not interested in any.",
        path: ["club_names"],
      });
    }
  });

const clubAccent: Record<ClubName, string> = {
  "AI/ML": "#3035B5",
  "Web Development": "#5B2D91",
  Cybersecurity: "#CC484A",
  DSA: "#3CA049",
};

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-[#25297F]">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3035B5] focus:ring-4 focus:ring-[#3035B5]/10";

export default function InterestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedClubs, setSelectedClubs] = useState<ClubName[]>([]);
  const [notInterested, setNotInterested] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const toggleClub = (club: ClubName) => {
    setNotInterested(false);
    setSelectedClubs((prev) =>
      prev.includes(club) ? prev.filter((c) => c !== club) : [...prev, club]
    );
  };

  const toggleNotInterested = () => {
    if (notInterested) {
      setNotInterested(false);
      return;
    }
    setSelectedClubs([]);
    setNotInterested(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");
    setSubmittedAt(null);

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      course: formData.get("course"),
      enrollment_number: formData.get("enrollment_number"),
      semester: formData.get("semester"),
      club_names: selectedClubs,
      not_interested: notInterested,
      other_club: formData.get("other_club") || undefined,
    };

    const result = clubInterestSchema.safeParse(payload);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error.issues[0]?.message ?? "Please check the form."
      );
      return;
    }

    try {
      const res = await fetch("/api/club-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setSelectedClubs([]);
      setNotInterested(false);
      setSubmittedAt(
        typeof data.submitted_at === "string"
          ? data.submitted_at
          : new Date().toISOString()
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Network error. Please try again.";
      setErrorMessage(message);
    }
  };

  const formattedSubmittedAt =
    submittedAt &&
    new Date(submittedAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-2xl shadow-[#3035B5]/8"
    >
      <div className="h-1.5 w-full bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3CA049]" />

      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-6 sm:px-10">
        <h2 className="text-xl font-bold text-[#25297F]">Club interest form</h2>
        <p className="mt-1 text-sm text-slate-600">
          Pick one or more technical fields, or indicate you are not interested in
          any club right now.
        </p>
      </div>

      <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
        <section className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            Personal
          </p>
          <Field id="name" label="Full name">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="As on your university ID"
              className={inputClass}
            />
          </Field>
        </section>

        <section className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            Academic
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="course" label="Course">
              <input
                id="course"
                name="course"
                type="text"
                required
                placeholder="e.g. BCA, MCA, B.Sc. (Hons.) CA"
                className={inputClass}
              />
            </Field>
            <Field id="enrollment_number" label="Enrollment number">
              <input
                id="enrollment_number"
                name="enrollment_number"
                type="text"
                required
                placeholder="University enrollment no."
                className={inputClass}
              />
            </Field>
            <Field
              id="semester"
              label="Semester"
              hint="Type your current semester (e.g. 3 or Semester 3)."
            >
              <input
                id="semester"
                name="semester"
                type="text"
                required
                inputMode="text"
                placeholder="e.g. 5"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            Field interest
          </p>
          <p className="text-sm text-slate-600">
            Select all clubs you want to join (multiple allowed).
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {CLUB_OPTIONS.map((club) => {
              const active = selectedClubs.includes(club);
              const accent = clubAccent[club];
              return (
                <button
                  key={club}
                  type="button"
                  onClick={() => toggleClub(club)}
                  className={`rounded-2xl border-2 px-4 py-4 text-left transition-all ${
                    active
                      ? "shadow-md"
                      : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                  }`}
                  style={
                    active
                      ? {
                          borderColor: accent,
                          backgroundColor: `${accent}12`,
                        }
                      : undefined
                  }
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: active ? accent : "#25297F" }}
                  >
                    {club}
                  </span>
                  {active && (
                    <span className="mt-1 block text-xs text-slate-500">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleNotInterested}
            aria-pressed={notInterested}
            className={`w-full rounded-2xl border-2 px-4 py-4 text-left transition ${
              notInterested
                ? "border-slate-500 bg-slate-100 shadow-sm"
                : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
            }`}
          >
            <span className="text-sm font-bold text-slate-700">
              {NOT_INTERESTED_LABEL}
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              {notInterested
                ? "Tap again to unselect and choose clubs above"
                : "Optional — if none of the clubs apply to you"}
            </span>
          </button>
        </section>

        <Field
          id="other_club"
          label="Already in another club?"
          hint="Optional — mention if you are already part of another society or club."
        >
          <input
            id="other_club"
            name="other_club"
            type="text"
            placeholder="Club name, if any"
            className={inputClass}
          />
        </Field>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-2xl border border-[#3CA049]/30 bg-[#3CA049]/10 px-4 py-4 text-sm text-[#2d7a38]"
            >
              <span className="text-lg" aria-hidden>✓</span>
              <div>
                <p className="font-medium">
                  Submitted successfully. Domain leads will contact you when
                  relevant.
                </p>
                {formattedSubmittedAt && (
                  <p className="mt-1 text-xs text-[#2d7a38]/90">
                    Recorded on {formattedSubmittedAt} (IST)
                  </p>
                )}
              </div>
            </motion.div>
          )}
          {status === "error" && errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-4 py-3 text-sm font-medium text-[#a33a3c]"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: status === "loading" ? 1 : 1.008 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.992 }}
          className="w-full rounded-2xl bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3035B5] bg-size-[200%_auto] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#3035B5]/30 transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? "Submitting…" : "Submit application"}
        </motion.button>
      </div>
    </motion.form>
  );
}

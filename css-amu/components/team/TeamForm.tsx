"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import logo from "@/public/cslogo.png";
import {
  CLUB_ACCENT,
  CLUB_OPTIONS,
  SEMESTER_OPTIONS,
  type ClubName,
} from "@/lib/clubs";
import {
  ENROLLMENT_ERROR,
  PHONE_ERROR,
  isValidEnrollment,
  isValidPhone,
  normalizeEnrollment,
  normalizePhone,
} from "@/lib/form-validation";

const teamEnum = z.enum(CLUB_OPTIONS);

const teamSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    course: z.string().trim().min(2, "Please enter your course."),
    enrollment_number: z
      .string()
      .refine(isValidEnrollment, ENROLLMENT_ERROR)
      .transform(normalizeEnrollment),
    phone_number: z
      .string()
      .refine(isValidPhone, PHONE_ERROR)
      .transform(normalizePhone),
    semester: z.enum(SEMESTER_OPTIONS, "Please select your semester."),
    club_names: z.array(teamEnum).min(1, "Select at least one team."),
    other_club: z.string().trim().max(300).optional(),
  });

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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="block text-sm font-semibold text-[#25297F]">
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : (
        <span className="block min-h-4" aria-hidden />
      )}
    </div>
  );
}

function onPhoneInput(e: FormEvent<HTMLInputElement>) {
  const el = e.currentTarget;
  const digits = el.value.replace(/\D/g, "").slice(0, 10);
  if (el.value !== digits) el.value = digits;
}

function onEnrollmentInput(e: FormEvent<HTMLInputElement>) {
  const el = e.currentTarget;
  const upper = el.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  if (el.value !== upper) el.value = upper;
}

const inputClass =
  "w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3035B5] focus:ring-4 focus:ring-[#3035B5]/10";

export default function TeamForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<ClubName[]>([]);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const toggleTeam = (team: ClubName) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((c) => c !== team) : [...prev, team],
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");
    setSubmittedAt(null);

    const formData = new FormData(form);
    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      setStatus("error");
      setErrorMessage("Please upload your resume (PDF preferred).");
      return;
    }

    const payload = {
      name: formData.get("name"),
      course: formData.get("course"),
      enrollment_number: formData.get("enrollment_number"),
      phone_number: formData.get("phone_number"),
      semester: formData.get("semester"),
      club_names: selectedTeams,
      other_club: formData.get("other_club") || undefined,
    };

    const result = teamSchema.safeParse(payload);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error.issues[0]?.message ?? "Please check the form.",
      );
      return;
    }

    try {
      const body = new FormData();
      body.set("name", result.data.name);
      body.set("course", result.data.course);
      body.set("enrollment_number", result.data.enrollment_number);
      body.set("phone_number", result.data.phone_number);
      body.set("semester", result.data.semester);
      body.set("club_names", JSON.stringify(result.data.club_names));
      if (result.data.other_club) body.set("other_club", result.data.other_club);
      body.set("resume", resume);

      const res = await fetch("/api/team-application", {
        method: "POST",
        body,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setSelectedTeams([]);
      setSubmittedAt(
        typeof data.submitted_at === "string"
          ? data.submitted_at
          : new Date().toISOString(),
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Network error. Please try again.",
      );
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
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl"
            aria-hidden
          />
          <h2 className="text-xl font-bold text-[#25297F]">
            Join the team application
          </h2>
        </div>
        <p className="mt-2 text-sm text-slate-600 sm:pl-[3.25rem]">
          Pick the teams you want to join, upload your resume, and shortlisted
          candidates get an interview call.
        </p>
      </div>

      <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
        <section className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            Personal
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
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
            <Field
              id="phone_number"
              label="Phone number"
              hint="Active mobile number so we can reach you for the interview."
            >
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                required
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                title="10-digit mobile number starting with 6, 7, 8 or 9"
                placeholder="e.g. 9876543210"
                className={inputClass}
                onInput={onPhoneInput}
              />
            </Field>
          </div>
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
            <Field
              id="enrollment_number"
              label="Enrollment number"
              hint="2 letters followed by 4 digits."
            >
              <input
                id="enrollment_number"
                name="enrollment_number"
                type="text"
                required
                maxLength={6}
                pattern="[A-Za-z]{2}[0-9]{4}"
                title="2 letters followed by 4 digits, e.g. GR8512"
                placeholder="e.g. GR8512"
                className={inputClass}
                onInput={onEnrollmentInput}
                autoCapitalize="characters"
                spellCheck={false}
              />
            </Field>
            <Field
              id="semester"
              label="Semester"
              hint="Select your current semester."
            >
              <select
                id="semester"
                name="semester"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select semester
                </option>
                {SEMESTER_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            Field interest
          </p>
          <p className="text-sm text-slate-600">
            Select all domains you want to contribute to (multiple allowed).
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {CLUB_OPTIONS.map((team) => {
              const active = selectedTeams.includes(team);
              const accent = CLUB_ACCENT[team];
              return (
                <button
                  key={team}
                  type="button"
                  onClick={() => toggleTeam(team)}
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
                    {team}
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
        </section>

        <Field
          id="other_club"
          label="Already in another club?"
          hint="Optional. Name another society or club if you are already a member."
        >
          <input
            id="other_club"
            name="other_club"
            type="text"
            placeholder="Club name, if any"
            className={inputClass}
          />
        </Field>

        <Field
          id="resume"
          label="Resume"
          hint="PDF, DOC, or DOCX. Max 2 MB."
        >
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3035B5] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
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
              <span className="text-lg" aria-hidden>
                ✓
              </span>
              <div>
                <p className="font-medium">
                  Application received. You will get an interview call shortly.
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

"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import CertificateView from "@/components/certificate/CertificateView";
import CertificateActions from "@/components/certificate/CertificateActions";
import { dayLabel } from "@/lib/cs360";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  enrollment_number: z.string().trim().min(2, "Enter enrollment number."),
  course: z.string().trim().min(2, "Enter your course."),
  phone_number: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 12;
    }, "Enter 10–12 digit phone."),
  semester: z.string().trim().min(1, "Enter semester."),
});

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[#25297F]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3035B5] focus:ring-4 focus:ring-[#3035B5]/10";

type Props = {
  code: string;
  dayPosition: string;
  label: string;
};

export default function ClaimForm({ code, dayPosition, label }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [issuedName, setIssuedName] = useState("");
  const [issuedDay, setIssuedDay] = useState(dayPosition);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      enrollment_number: String(fd.get("enrollment_number") ?? "").toUpperCase(),
      course: String(fd.get("course") ?? ""),
      phone_number: String(fd.get("phone_number") ?? ""),
      semester: String(fd.get("semester") ?? ""),
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(parsed.error.issues[0]?.message ?? "Check the form.");
      return;
    }

    try {
      const res = await fetch("/api/cs360/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Could not issue certificate.");
        return;
      }
      setIssuedName(
        typeof data.name === "string" && data.name
          ? data.name
          : parsed.data.name,
      );
      setIssuedDay(
        typeof data.day_position === "string" ? data.day_position : dayPosition,
      );
      setAlreadyClaimed(Boolean(data.already_claimed));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#3CA049]/30 bg-[#3CA049]/10 px-4 py-4 text-center text-sm text-[#2d7a38]">
          {alreadyClaimed ? (
            <>
              Certificate already issued for this enrollment (
              <strong>{issuedName}</strong> · {dayLabel(issuedDay)} day). Only
              one certificate is allowed per enrollment for each workshop day.
            </>
          ) : (
            <>
              Certificate generated for <strong>{issuedName}</strong> (
              {dayLabel(issuedDay)} day · {label}). Attendance recorded.
            </>
          )}
        </div>
        <CertificateView name={issuedName} dayPosition={issuedDay} />
        <CertificateActions
          filename={`CS360-4.0-${issuedName.replace(/\s+/g, "-")}`}
        />
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl"
    >
      <div className="h-1.5 w-full bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3CA049]" />
      <div className="space-y-6 px-6 py-8 sm:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3035B5]">
            CS360 4.0 · {dayLabel(dayPosition)} day
          </p>
          <h2 className="mt-2 text-xl font-bold text-[#25297F]">
            Claim your e-certificate
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Fill your details once. Your attendance is saved and the certificate
            is generated instantly.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name">
            <input
              id="name"
              name="name"
              required
              className={inputClass}
              placeholder="As on university ID"
            />
          </Field>
          <Field id="enrollment_number" label="Enrollment number">
            <input
              id="enrollment_number"
              name="enrollment_number"
              required
              className={inputClass}
              autoCapitalize="characters"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.toUpperCase();
              }}
            />
          </Field>
          <Field id="course" label="Course">
            <input
              id="course"
              name="course"
              required
              className={inputClass}
              placeholder="e.g. BCA / MCA"
            />
          </Field>
          <Field id="semester" label="Semester">
            <input
              id="semester"
              name="semester"
              required
              className={inputClass}
              placeholder="e.g. 5"
            />
          </Field>
          <Field id="phone_number" label="Phone number">
            <input
              id="phone_number"
              name="phone_number"
              required
              inputMode="numeric"
              className={inputClass}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/\D/g, "")
                  .slice(0, 12);
              }}
            />
          </Field>
        </div>

        <AnimatePresence>
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

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-2xl bg-[#3035B5] py-3.5 text-sm font-bold text-white hover:bg-[#25297F] disabled:opacity-60"
        >
          {status === "loading" ? "Generating…" : "Generate certificate"}
        </button>
      </div>
    </motion.form>
  );
}

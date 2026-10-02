"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email."),
  subject: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(3000, "Message is too long."),
});

const inputClass =
  "w-full rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3035B5] focus:ring-4 focus:ring-[#3035B5]/10";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMessage("");
    setSubmittedAt(null);

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject") || undefined,
      message: formData.get("message"),
    };

    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      setStatus("error");
      setErrorMessage(
        result.error.issues[0]?.message ?? "Please check the form.",
      );
      return;
    }

    try {
      const res = await fetch("/api/contact", {
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
      setSubmittedAt(
        typeof data.submitted_at === "string"
          ? data.submitted_at
          : new Date().toISOString(),
      );
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8"
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[#25297F]">
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              className={inputClass}
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#25297F]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-[#25297F]">
            Subject
            <span className="ml-1 font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="subject"
            name="subject"
            className={inputClass}
            placeholder="Workshops, partnerships, general query…"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-[#25297F]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-y min-h-[140px]`}
            placeholder="How can we help?"
          />
        </div>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-[#3CA049]/30 bg-[#3CA049]/10 px-4 py-4 text-sm text-[#2d7a38]"
            >
              <p className="font-medium">
                Thank you — your message was sent. We will get back to you soon.
              </p>
              {formattedSubmittedAt && (
                <p className="mt-1 text-xs opacity-90">
                  Sent on {formattedSubmittedAt} (IST)
                </p>
              )}
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
          className="w-full rounded-2xl bg-[#3035B5] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#3035B5]/25 transition hover:bg-[#25297F] disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </motion.button>
      </div>
    </motion.form>
  );
}

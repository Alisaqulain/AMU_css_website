"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

const interestOptions = [
  "AI/ML",
  "Cybersecurity",
  "Web Development",
  "DSA",
];

const interestFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long."),

  course: z
    .string()
    .trim()
    .min(2, "Please enter your course."),

  year: z
    .string()
    .min(1, "Please select your year."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  interests: z
    .array(z.string())
    .min(1, "Please select at least one area of interest."),

  feedback: z
    .string()
    .trim()
    .min(1, "Please provide your feedback.")
    .max(1000, "Feedback cannot exceed 1000 characters."),
});

export default function InterestForm() {
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      course: formData.get("course"),
      year: formData.get("year"),
      email: formData.get("email"),
      interests,
      feedback: formData.get("feedback"),
    };

    const result = interestFormSchema.safeParse(data);

    if (!result.success) {
      alert(
        result.error.issues[0]?.message ??
          "Please check the form and try again."
      );
      return;
    }

    console.log("Form submitted:", result.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[#25297F]"
        >
          Full Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#3035B5] focus:bg-white focus:ring-2 focus:ring-[#3035B5]/10"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="course"
            className="mb-2 block text-sm font-medium text-[#25297F]"
          >
            Course
          </label>

          <input
            id="course"
            name="course"
            type="text"
            required
            placeholder="e.g. B.Sc. Hons. Computer Applications"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#3035B5] focus:bg-white focus:ring-2 focus:ring-[#3035B5]/10"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-medium text-[#25297F]"
          >
            Year
          </label>

          <select
            id="year"
            name="year"
            required
            defaultValue=""
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#3035B5] focus:bg-white focus:ring-2 focus:ring-[#3035B5]/10"
          >
            <option value="" disabled>
              Select your year
            </option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#25297F]"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#3035B5] focus:bg-white focus:ring-2 focus:ring-[#3035B5]/10"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[#25297F]">
          Areas of Interest
        </p>

        <p className="mb-4 text-sm text-slate-500">
          Select at least one domain you are interested in.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((interest) => {
            const selected = interests.includes(interest);

            return (
              <label
                key={interest}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  selected
                    ? "border-[#3035B5] bg-[#3035B5]/5"
                    : "border-slate-200 bg-slate-50 hover:border-[#3035B5]/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleInterestChange(interest)}
                  className="h-4 w-4 accent-[#3035B5]"
                />

                <span
                  className={`text-sm font-medium ${
                    selected ? "text-[#3035B5]" : "text-slate-700"
                  }`}
                >
                  {interest}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="feedback"
          className="mb-2 block text-sm font-medium text-[#25297F]"
        >
          Feedback
        </label>

        <textarea
          id="feedback"
          name="feedback"
          rows={5}
          required
          placeholder="Share your thoughts, suggestions, or what you would like CSS to organize..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#3035B5] focus:bg-white focus:ring-2 focus:ring-[#3035B5]/10"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#3035B5] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#25297F] focus:outline-none focus:ring-2 focus:ring-[#3035B5]/30 focus:ring-offset-2"
      >
        Submit Response
      </button>
    </form>
  );
}
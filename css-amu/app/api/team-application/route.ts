import { NextResponse } from "next/server";
import { z } from "zod";
import { CLUB_OPTIONS, NOT_INTERESTED_LABEL } from "@/lib/clubs";
import { createAnonSupabase } from "@/lib/supabase/server";
import { uploadPublicFile } from "@/lib/upload";

const teamEnum = z.enum(CLUB_OPTIONS);

const fieldsSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    course: z.string().trim().min(2).max(200),
    enrollment_number: z.string().trim().min(2).max(50),
    phone_number: z
      .string()
      .trim()
      .min(10)
      .max(20)
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 12;
      }, "Invalid phone number."),
    semester: z.string().trim().min(1).max(30),
    club_names: z.array(teamEnum).default([]),
    not_interested: z.boolean().default(false),
    other_club: z.string().trim().max(300).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.not_interested) {
      if (data.club_names.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: "Clear team selections when choosing not interested.",
          path: ["club_names"],
        });
      }
      return;
    }
    if (data.club_names.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Select at least one team, or choose not interested in any.",
        path: ["club_names"],
      });
    }
  });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let clubNames: unknown = [];
    const rawClubs = formData.get("club_names");
    if (typeof rawClubs === "string") {
      try {
        clubNames = JSON.parse(rawClubs);
      } catch {
        clubNames = [];
      }
    }

    const parsed = fieldsSchema.safeParse({
      name: formData.get("name"),
      course: formData.get("course"),
      enrollment_number: formData.get("enrollment_number"),
      phone_number: formData.get("phone_number"),
      semester: formData.get("semester"),
      club_names: clubNames,
      not_interested: formData.get("not_interested") === "true",
      other_club: formData.get("other_club") || null,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
        { status: 400 },
      );
    }

    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Resume file is required." },
        { status: 400 },
      );
    }

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (resume.type && !allowed.includes(resume.type)) {
      const ext = resume.name.split(".").pop()?.toLowerCase();
      if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
        return NextResponse.json(
          { error: "Resume must be PDF, DOC, or DOCX." },
          { status: 400 },
        );
      }
    }

    const uploaded = await uploadPublicFile("resumes", resume);
    if ("error" in uploaded) {
      return NextResponse.json(
        {
          error:
            uploaded.error ||
            "Could not upload resume. In Supabase → Storage, create a public bucket named css-uploads, then try again.",
        },
        { status: 500 },
      );
    }

    const resumeUrl = uploaded.url;
    const resumeFilename = uploaded.filename;

    const submittedAt = new Date().toISOString();
    const clubNameSummary = parsed.data.not_interested
      ? NOT_INTERESTED_LABEL
      : parsed.data.club_names.join(", ");

    const supabase = createAnonSupabase();
    const { error } = await supabase.from("team_applications").insert({
      name: parsed.data.name,
      course: parsed.data.course,
      enrollment_number: parsed.data.enrollment_number,
      phone_number: parsed.data.phone_number.replace(/\D/g, ""),
      semester: parsed.data.semester,
      club_name: clubNameSummary,
      club_names: parsed.data.not_interested ? [] : parsed.data.club_names,
      not_interested: parsed.data.not_interested,
      other_club: parsed.data.other_club?.trim() || null,
      resume_url: resumeUrl,
      resume_filename: resumeFilename,
      created_at: submittedAt,
    });

    if (error) {
      console.error("team_applications insert:", error);
      return NextResponse.json(
        {
          error:
            "Could not save your application. Run the team_applications migration in Supabase, then try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, submitted_at: submittedAt });
  } catch {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }
}

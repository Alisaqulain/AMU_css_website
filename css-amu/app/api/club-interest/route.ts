import { NextResponse } from "next/server";
import { z } from "zod";
import { CLUB_OPTIONS, NOT_INTERESTED_LABEL } from "@/lib/clubs";
import { getClientIp } from "@/lib/client-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAnonSupabase } from "@/lib/supabase/server";

const CLUB_INTEREST_RATE_LIMIT = { limit: 20, windowMs: 60 * 60 * 1000 };

const clubEnum = z.enum(CLUB_OPTIONS);

const bodySchema = z
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
    club_names: z.array(clubEnum).default([]),
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
    const rate = checkRateLimit(
      `club-interest:${getClientIp(request)}`,
      CLUB_INTEREST_RATE_LIMIT,
    );
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions from your network. Try again in ${Math.ceil(rate.retryAfterSec / 60)} minutes.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        },
      );
    }

    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const clubNameSummary = parsed.data.not_interested
      ? NOT_INTERESTED_LABEL
      : parsed.data.club_names.join(", ");

    const supabase = createAnonSupabase();
    const { error } = await supabase.from("club_interests").insert({
      name: parsed.data.name,
      course: parsed.data.course,
      enrollment_number: parsed.data.enrollment_number,
      phone_number: parsed.data.phone_number.replace(/\D/g, ""),
      semester: parsed.data.semester,
      club_name: clubNameSummary,
      club_names: parsed.data.not_interested ? [] : parsed.data.club_names,
      not_interested: parsed.data.not_interested,
      other_club: parsed.data.other_club?.trim() || null,
      created_at: submittedAt,
    });

    if (error) {
      console.error("club_interests insert:", error);
      return NextResponse.json(
        { error: "Could not save your response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, submitted_at: submittedAt });
  } catch {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }
}

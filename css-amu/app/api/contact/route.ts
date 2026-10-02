import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyMathCaptcha, isBasicCaptchaConfigured } from "@/lib/basic-captcha";
import { getClientIp } from "@/lib/client-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAnonSupabase } from "@/lib/supabase/server";

const CONTACT_RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(10).max(3000),
  captchaToken: z.string().trim().min(1, "Captcha is required."),
  captchaAnswer: z.coerce
    .number({ error: "Enter the captcha answer as a number." })
    .int("Enter the captcha answer as a whole number."),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many messages from your network. Try again in ${rate.retryAfterSec} seconds.`,
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
        { status: 400 },
      );
    }

    if (!isBasicCaptchaConfigured()) {
      console.error("contact: CAPTCHA_SECRET or ADMIN_PASSWORD missing");
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable." },
        { status: 503 },
      );
    }

    const captcha = verifyMathCaptcha(
      parsed.data.captchaToken,
      parsed.data.captchaAnswer,
    );
    if (!captcha.ok) {
      return NextResponse.json({ error: captcha.error }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const supabase = createAnonSupabase();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject?.trim() || "",
      message: parsed.data.message,
      created_at: submittedAt,
    });

    if (error) {
      console.error("contact_messages insert:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
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

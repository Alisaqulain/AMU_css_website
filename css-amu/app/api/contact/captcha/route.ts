import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { createMathCaptcha, isBasicCaptchaConfigured } from "@/lib/basic-captcha";
import { checkRateLimit } from "@/lib/rate-limit";

const CAPTCHA_RATE_LIMIT = { limit: 30, windowMs: 60 * 60 * 1000 };

export async function GET(request: Request) {
  if (!isBasicCaptchaConfigured()) {
    return NextResponse.json(
      { error: "Captcha is not configured." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact-captcha:${ip}`, CAPTCHA_RATE_LIMIT);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many captcha requests. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  const challenge = createMathCaptcha();
  if (!challenge) {
    return NextResponse.json(
      { error: "Could not create captcha." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    question: challenge.question,
    token: challenge.token,
  });
}

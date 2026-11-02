import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import { getClientIp } from "@/lib/client-ip";
import { checkRateLimit } from "@/lib/rate-limit";

const ADMIN_LOGIN_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin is not configured on the server." },
      { status: 503 }
    );
  }

  const rate = checkRateLimit(
    `admin-login:${getClientIp(request)}`,
    ADMIN_LOGIN_RATE_LIMIT,
  );
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Too many login attempts. Try again in ${Math.ceil(rate.retryAfterSec / 60)} minutes.`,
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } }
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}

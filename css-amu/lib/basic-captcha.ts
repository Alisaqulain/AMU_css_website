import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 10 * 60 * 1000;

function captchaSecret(): string | null {
  const secret =
    process.env.CAPTCHA_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim();
  return secret || null;
}

function sign(a: number, b: number, exp: number): string {
  const secret = captchaSecret();
  if (!secret) throw new Error("Captcha secret not configured");
  return createHmac("sha256", secret)
    .update(`${a}:${b}:${exp}`)
    .digest("base64url");
}

function encodePayload(payload: { a: number; b: number; exp: number; sig: string }) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decodePayload(token: string): { a: number; b: number; exp: number; sig: string } | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    const data = JSON.parse(json) as {
      a?: number;
      b?: number;
      exp?: number;
      sig?: string;
    };
    if (
      typeof data.a !== "number" ||
      typeof data.b !== "number" ||
      typeof data.exp !== "number" ||
      typeof data.sig !== "string"
    ) {
      return null;
    }
    return { a: data.a, b: data.b, exp: data.exp, sig: data.sig };
  } catch {
    return null;
  }
}

export function isBasicCaptchaConfigured(): boolean {
  return Boolean(captchaSecret());
}

export function createMathCaptcha(): { question: string; token: string } | null {
  if (!captchaSecret()) return null;

  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  const exp = Date.now() + TTL_MS;
  const sig = sign(a, b, exp);
  const token = encodePayload({ a, b, exp, sig });

  return {
    question: `What is ${a} + ${b}?`,
    token,
  };
}

export function verifyMathCaptcha(
  token: string,
  answerRaw: string | number,
): { ok: true } | { ok: false; error: string } {
  if (!captchaSecret()) {
    return { ok: false, error: "Captcha is not configured on the server." };
  }

  const payload = decodePayload(token);
  if (!payload) {
    return { ok: false, error: "Captcha expired or invalid. Refresh and try again." };
  }

  if (Date.now() > payload.exp) {
    return { ok: false, error: "Captcha expired. Refresh and try again." };
  }

  const expectedSig = sign(payload.a, payload.b, payload.exp);
  const aBuf = Buffer.from(payload.sig);
  const bBuf = Buffer.from(expectedSig);
  if (aBuf.length !== bBuf.length || !timingSafeEqual(aBuf, bBuf)) {
    return { ok: false, error: "Captcha expired or invalid. Refresh and try again." };
  }

  const answer =
    typeof answerRaw === "number"
      ? answerRaw
      : parseInt(String(answerRaw).trim(), 10);

  if (!Number.isFinite(answer) || answer !== payload.a + payload.b) {
    return { ok: false, error: "Wrong answer. Check the math and try again." };
  }

  return { ok: true };
}

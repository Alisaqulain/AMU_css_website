import { NextResponse } from "next/server";
import {
  findCertificateBySerial,
  findCertificatesByName,
} from "@/lib/certificates";
import { getClientIp } from "@/lib/client-ip";
import { looksLikeCertificateSerial } from "@/lib/cs360";
import { checkRateLimit } from "@/lib/rate-limit";

const VERIFY_RATE_LIMIT = { limit: 30, windowMs: 60 * 1000 };

export async function GET(request: Request) {
  const rate = checkRateLimit(
    `certificate-verify:${getClientIp(request)}`,
    VERIFY_RATE_LIMIT,
  );
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Too many checks. Try again in ${rate.retryAfterSec} seconds.`,
      },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSec) } },
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (query.length < 2 || query.length > 120) {
    return NextResponse.json(
      { error: "Enter a name or certificate serial number." },
      { status: 400 },
    );
  }

  try {
    if (looksLikeCertificateSerial(query)) {
      const bySerial = await findCertificateBySerial(query);
      if (bySerial) {
        return NextResponse.json({ certificates: [bySerial] });
      }
    }

    const byName = await findCertificatesByName(query);
    return NextResponse.json({ certificates: byName });
  } catch (err) {
    console.error("certificate verify:", err);
    return NextResponse.json(
      { error: "Could not verify. Check database migration." },
      { status: 500 },
    );
  }
}

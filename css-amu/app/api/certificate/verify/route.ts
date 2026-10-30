import { NextResponse } from "next/server";
import {
  findCertificateBySerial,
  findCertificatesByName,
} from "@/lib/certificates";
import { looksLikeCertificateSerial } from "@/lib/cs360";

export async function GET(request: Request) {
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

import { NextResponse } from "next/server";
import { createAnonSupabase } from "@/lib/supabase/server";

type Params = { params: Promise<{ code: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { code } = await params;
  const normalized = code?.trim().toUpperCase();

  if (!normalized) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from("certificate_codes")
      .select("code, label, day_position, status, expires_at")
      .eq("code", normalized)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: "Code not found." }, { status: 404 });
    }

    let status = data.status;
    if (
      status === "open" &&
      data.expires_at &&
      new Date(data.expires_at) < new Date()
    ) {
      status = "expired";
    }

    return NextResponse.json({
      code: data.code,
      label: data.label,
      day_position: data.day_position,
      status,
    });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

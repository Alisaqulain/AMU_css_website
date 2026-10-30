import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  CS360_DAY_OPTIONS,
  ISSUED_CERTIFICATE_STATUS_OPTIONS,
  randomCertificateSerial,
} from "@/lib/cs360";
import { createServiceSupabase } from "@/lib/supabase/server";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((v) => v || null);

const recipientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  enrollment_number: optionalText(50).transform((v) => v?.toUpperCase() ?? null),
  course: optionalText(200),
});

const createSchema = z.object({
  day_position: z.enum(CS360_DAY_OPTIONS),
  label: z.string().trim().max(120).optional(),
  recipients: z.array(recipientSchema).min(1).max(500),
});

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(ISSUED_CERTIFICATE_STATUS_OPTIONS),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ certificates: data ?? [] });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: issue?.path.includes("name")
          ? "Every certificate needs a name (at least 2 characters)."
          : (issue?.message ?? "Invalid data."),
      },
      { status: 400 },
    );
  }

  try {
    const supabase = createServiceSupabase();
    const label = parsed.data.label?.trim() || "CS360 4.0";

    // Retry with fresh serials if one collides with an existing certificate
    for (let attempt = 0; attempt < 3; attempt++) {
      const serials = new Set<string>();
      while (serials.size < parsed.data.recipients.length) {
        serials.add(randomCertificateSerial());
      }
      const serialList = [...serials];

      const { data, error } = await supabase
        .from("certificates")
        .insert(
          parsed.data.recipients.map((r, i) => ({
            serial: serialList[i],
            name: r.name,
            enrollment_number: r.enrollment_number,
            course: r.course,
            label,
            day_position: parsed.data.day_position,
          })),
        )
        .select();

      if (error?.code === "23505") continue;
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ certificates: data ?? [] });
    }

    return NextResponse.json(
      { error: "Could not generate unique serial numbers. Try again." },
      { status: 500 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("certificates")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ certificate: data });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const supabase = createServiceSupabase();
    const { error } = await supabase.from("certificates").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

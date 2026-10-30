import { NextResponse } from "next/server";
import { z } from "zod";
import { dayLabel } from "@/lib/cs360";
import {
  createAnonSupabase,
  createServiceSupabase,
  hasValidServiceRoleKey,
} from "@/lib/supabase/server";

const bodySchema = z.object({
  code: z.string().trim().min(4).max(32),
  name: z.string().trim().min(2).max(120),
  enrollment_number: z.string().trim().min(2).max(50),
  course: z.string().trim().min(2).max(200),
  phone_number: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 12;
    }),
  semester: z.string().trim().min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const field = issue?.path?.[0] ? String(issue.path[0]) : "field";
      return NextResponse.json(
        {
          error:
            issue?.message && !issue.message.startsWith("Invalid input")
              ? issue.message
              : `Missing or invalid ${field}. Please fill all fields and try again.`,
        },
        { status: 400 },
      );
    }

    const supabase = hasValidServiceRoleKey()
      ? createServiceSupabase()
      : createAnonSupabase();

    const { data: codeRow, error: codeError } = await supabase
      .from("certificate_codes")
      .select("id, code, day_position, status, expires_at, label")
      .eq("code", parsed.data.code.toUpperCase())
      .maybeSingle();

    if (codeError) {
      console.error("certificate_codes lookup:", codeError);
      return NextResponse.json(
        { error: "Could not look up barcode. Check database migration." },
        { status: 500 },
      );
    }

    if (!codeRow) {
      return NextResponse.json(
        { error: "Invalid barcode / QR code." },
        { status: 404 },
      );
    }

    if (codeRow.status === "closed") {
      return NextResponse.json(
        { error: "This barcode is closed. Certificates are no longer issued." },
        { status: 403 },
      );
    }

    if (codeRow.status === "expired") {
      return NextResponse.json(
        { error: "This barcode has expired." },
        { status: 403 },
      );
    }

    if (codeRow.expires_at && new Date(codeRow.expires_at) < new Date()) {
      if (hasValidServiceRoleKey()) {
        await createServiceSupabase()
          .from("certificate_codes")
          .update({ status: "expired" })
          .eq("id", codeRow.id);
      }
      return NextResponse.json(
        { error: "This barcode has expired." },
        { status: 403 },
      );
    }

    if (codeRow.status !== "open") {
      return NextResponse.json(
        { error: "This barcode is not open for claims." },
        { status: 403 },
      );
    }

    const enrollment = parsed.data.enrollment_number.toUpperCase();
    const phone = parsed.data.phone_number.replace(/\D/g, "");

    // One certificate per enrollment number per workshop day (First / Second / Third)
    const { data: existingForDay } = await supabase
      .from("certificate_attendance")
      .select("id, name, day_position, enrollment_number")
      .eq("enrollment_number", enrollment)
      .eq("day_position", codeRow.day_position)
      .maybeSingle();

    if (existingForDay) {
      return NextResponse.json({
        ok: true,
        already_claimed: true,
        name: existingForDay.name,
        day_position: existingForDay.day_position,
        label: codeRow.label,
        message: `A ${dayLabel(codeRow.day_position)} day certificate was already issued for enrollment ${enrollment}.`,
      });
    }

    const { error: insertError } = await supabase
      .from("certificate_attendance")
      .insert({
        code_id: codeRow.id,
        name: parsed.data.name,
        enrollment_number: enrollment,
        course: parsed.data.course,
        phone_number: phone,
        semester: parsed.data.semester,
        day_position: codeRow.day_position,
      });

    if (insertError) {
      console.error("certificate_attendance insert:", insertError);
      if (insertError.code === "23505") {
        const { data: again } = await supabase
          .from("certificate_attendance")
          .select("name, day_position")
          .eq("enrollment_number", enrollment)
          .eq("day_position", codeRow.day_position)
          .maybeSingle();

        return NextResponse.json({
          ok: true,
          already_claimed: true,
          name: again?.name ?? parsed.data.name,
          day_position: again?.day_position ?? codeRow.day_position,
          label: codeRow.label,
          message: `A ${dayLabel(codeRow.day_position)} day certificate was already issued for enrollment ${enrollment}.`,
        });
      }
      return NextResponse.json(
        { error: "Could not save attendance. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      name: parsed.data.name,
      day_position: codeRow.day_position,
      label: codeRow.label,
    });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

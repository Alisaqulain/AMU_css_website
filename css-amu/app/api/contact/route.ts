import { NextResponse } from "next/server";
import { z } from "zod";
import { createAnonSupabase } from "@/lib/supabase/server";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(10).max(3000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data." },
        { status: 400 }
      );
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

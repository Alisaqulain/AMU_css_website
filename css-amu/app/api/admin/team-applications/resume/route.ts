import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createServiceSupabase, hasValidServiceRoleKey } from "@/lib/supabase/server";
import postgres from "postgres";

async function fetchResumeRow(id: string): Promise<{
  resume_url: string | null;
  resume_filename: string | null;
} | null> {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    const sql = postgres(databaseUrl, {
      ssl: "require",
      max: 1,
      idle_timeout: 5,
      connect_timeout: 10,
    });
    try {
      const rows = await sql<
        { resume_url: string | null; resume_filename: string | null }[]
      >`
        select resume_url, resume_filename
        from public.team_applications
        where id = ${id}
        limit 1
      `;
      return rows[0] ?? null;
    } finally {
      await sql.end({ timeout: 2 });
    }
  }

  if (!hasValidServiceRoleKey()) return null;

  const supabase = createServiceSupabase();
  const { data } = await supabase
    .from("team_applications")
    .select("resume_url, resume_filename")
    .eq("id", id)
    .maybeSingle();

  return data;
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    const row = await fetchResumeRow(id);
    if (!row?.resume_url) {
      return NextResponse.json({ error: "Resume not found." }, { status: 404 });
    }

    const filename = row.resume_filename || "resume.pdf";

    // Legacy fallback: data URL stored when Storage bucket was missing
    if (row.resume_url.startsWith("data:")) {
      const match = row.resume_url.match(/^data:([^;]+);base64,([\s\S]+)$/);
      if (!match) {
        return NextResponse.json(
          { error: "Invalid stored resume." },
          { status: 500 },
        );
      }
      const mime = match[1] || "application/pdf";
      const buffer = Buffer.from(match[2], "base64");
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mime,
          "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    // Normal public Storage / http URL
    return NextResponse.redirect(row.resume_url);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

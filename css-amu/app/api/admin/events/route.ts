import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createServiceSupabase } from "@/lib/supabase/server";
import { uploadPublicFile } from "@/lib/upload";

const eventSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().max(2000).optional(),
  year: z.string().trim().max(20).optional(),
  is_coming_soon: z.boolean().optional(),
  image_url: z
    .union([z.string().url(), z.literal(""), z.null()])
    .optional()
    .transform((v) => (v ? v : null)),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ events: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  try {
    let title = "";
    let description = "";
    let year = new Date().getFullYear().toString();
    let is_coming_soon = false;
    let image_url: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = String(formData.get("title") ?? "");
      description = String(formData.get("description") ?? "");
      year = String(formData.get("year") ?? year);
      is_coming_soon = formData.get("is_coming_soon") === "true";

      const image = formData.get("image");
      if (image instanceof File && image.size > 0) {
        const uploaded = await uploadPublicFile("events", image);
        if ("error" in uploaded) {
          if (image.size > 600_000) {
            return NextResponse.json(
              { error: uploaded.error },
              { status: 500 },
            );
          }
          const buf = Buffer.from(await image.arrayBuffer());
          const mime = image.type || "image/jpeg";
          image_url = `data:${mime};base64,${buf.toString("base64")}`;
        } else {
          image_url = uploaded.url;
        }
      }
    } else {
      const json = await request.json().catch(() => null);
      const parsed = eventSchema.safeParse(json);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid event data." },
          { status: 400 },
        );
      }
      title = parsed.data.title;
      description = parsed.data.description ?? "";
      year = parsed.data.year ?? year;
      is_coming_soon = parsed.data.is_coming_soon ?? false;
      image_url = parsed.data.image_url ?? null;
    }

    const parsed = eventSchema.safeParse({
      title,
      description,
      year,
      is_coming_soon,
      image_url,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid event data." }, { status: 400 });
    }

    const supabase = createServiceSupabase();
    const { data, error } = await supabase
      .from("events")
      .insert({
        title: parsed.data.title,
        description: parsed.data.description ?? "",
        year: parsed.data.year ?? new Date().getFullYear().toString(),
        is_coming_soon: parsed.data.is_coming_soon ?? false,
        image_url: parsed.data.image_url ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message.includes("image_url")
              ? `${error.message} Run the migration to add events.image_url.`
              : error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ event: data });
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
    return NextResponse.json({ error: "Missing event id." }, { status: 400 });
  }

  try {
    const supabase = createServiceSupabase();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

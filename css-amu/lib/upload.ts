import { createServiceSupabase, hasValidServiceRoleKey } from "@/lib/supabase/server";

const BUCKET = "css-uploads";

async function ensureBucket(
  supabase: ReturnType<typeof createServiceSupabase>,
): Promise<string | null> {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) return listError.message;

  const exists = buckets?.some((b) => b.name === BUCKET || b.id === BUCKET);
  if (exists) return null;

  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 2 * 1024 * 1024,
  });

  // Ignore "already exists" races
  if (createError && !/exists|duplicate/i.test(createError.message)) {
    return createError.message;
  }
  return null;
}

export async function uploadPublicFile(
  folder: string,
  file: File,
): Promise<{ url: string; filename: string } | { error: string }> {
  if (!hasValidServiceRoleKey()) {
    return {
      error:
        "File upload needs SUPABASE_SERVICE_ROLE_KEY in .env.local (service_role / secret key).",
    };
  }

  const maxBytes = 2 * 1024 * 1024;
  if (file.size > maxBytes) {
    return { error: "File must be 2 MB or smaller." };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const path = `${folder}/${Date.now()}-${safeName}`;

  try {
    const supabase = createServiceSupabase();
    const bucketError = await ensureBucket(supabase);
    if (bucketError) {
      return {
        error: `Could not create Storage bucket "${BUCKET}": ${bucketError}. Create it manually in Supabase → Storage (public).`,
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      return {
        error: `${uploadError.message} (Create a public Storage bucket named "${BUCKET}" in Supabase → Storage.)`,
      };
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { url: data.publicUrl, filename: file.name };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Upload failed.",
    };
  }
}

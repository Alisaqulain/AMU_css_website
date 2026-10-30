import {
  createAnonSupabase,
  createServiceSupabase,
  hasValidServiceRoleKey,
} from "@/lib/supabase/server";
import { normalizeCertificateSerial } from "@/lib/cs360";

/** Fields that are safe to show publicly on the verify page. */
export const PUBLIC_CERTIFICATE_FIELDS =
  "serial, name, label, day_position, status, created_at";

export type PublicCertificate = {
  serial: string;
  name: string;
  label: string;
  day_position: string;
  status: string;
  created_at: string;
};

export function certificateReader() {
  return hasValidServiceRoleKey()
    ? createServiceSupabase()
    : createAnonSupabase();
}

export async function findCertificateBySerial(
  serial: string,
): Promise<PublicCertificate | null> {
  const { data, error } = await certificateReader()
    .from("certificates")
    .select(PUBLIC_CERTIFICATE_FIELDS)
    .eq("serial", normalizeCertificateSerial(serial))
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

/** Exact, case-insensitive name match (no partial matching, so names can't be enumerated). */
export async function findCertificatesByName(
  name: string,
): Promise<PublicCertificate[]> {
  const pattern = name.trim().replace(/\s+/g, " ").replace(/[\%_]/g, "\$&");
  const { data, error } = await certificateReader()
    .from("certificates")
    .select(PUBLIC_CERTIFICATE_FIELDS)
    .ilike("name", pattern)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw new Error(error.message);
  return data ?? [];
}

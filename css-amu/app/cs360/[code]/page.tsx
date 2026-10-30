import ClaimForm from "@/components/certificate/ClaimForm";
import FadeIn from "@/components/motion/FadeIn";
import { dayLabel } from "@/lib/cs360";
import { createAnonSupabase } from "@/lib/supabase/server";
import { pageMetadata } from "@/lib/site-seo";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  return pageMetadata({
    title: `CS360 certificate · ${code}`,
    description: "Claim your CS360 4.0 Workshop Series e-certificate.",
    path: `/cs360/${code}`,
  });
}

export default async function Cs360ClaimPage({ params }: Props) {
  const { code } = await params;
  const normalized = code.trim().toUpperCase();

  let row: {
    code: string;
    label: string;
    day_position: string;
    status: string;
    expires_at: string | null;
  } | null = null;
  let loadError = "";

  try {
    const supabase = createAnonSupabase();
    const { data, error } = await supabase
      .from("certificate_codes")
      .select("code, label, day_position, status, expires_at")
      .eq("code", normalized)
      .maybeSingle();

    if (error) loadError = error.message;
    else row = data;
  } catch {
    loadError = "Server configuration error.";
  }

  let status = row?.status ?? "closed";
  if (
    row &&
    status === "open" &&
    row.expires_at &&
    new Date(row.expires_at) < new Date()
  ) {
    status = "expired";
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              CS360 4.0 Workshop Series
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#25297F] sm:text-4xl">
              E-certificate claim
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
        {loadError && (
          <p className="rounded-2xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
            {loadError} Run the certificates migration in Supabase if tables are
            missing.
          </p>
        )}

        {!loadError && !row && (
          <p className="rounded-2xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-4 py-4 text-sm text-[#a33a3c]">
            This barcode is invalid or was deleted.
          </p>
        )}

        {row && status === "closed" && (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
            This barcode is <strong>closed</strong>. Certificates are not being
            issued right now.
          </p>
        )}

        {row && status === "expired" && (
          <p className="rounded-2xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-4 py-4 text-sm text-[#a33a3c]">
            This barcode has <strong>expired</strong> and can no longer issue
            certificates.
          </p>
        )}

        {row && status === "open" && (
          <ClaimForm
            code={row.code}
            dayPosition={row.day_position}
            label={`${row.label} · ${dayLabel(row.day_position)} day`}
          />
        )}
      </section>
    </div>
  );
}

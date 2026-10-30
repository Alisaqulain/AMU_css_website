import Link from "next/link";
import CertificateActions from "@/components/certificate/CertificateActions";
import CertificateView from "@/components/certificate/CertificateView";
import FadeIn from "@/components/motion/FadeIn";
import {
  findCertificateBySerial,
  type PublicCertificate,
} from "@/lib/certificates";
import { dayLabel, normalizeCertificateSerial } from "@/lib/cs360";
import { pageMetadata } from "@/lib/site-seo";

type Props = { params: Promise<{ serial: string }> };

export async function generateMetadata({ params }: Props) {
  const { serial } = await params;
  const normalized = normalizeCertificateSerial(decodeURIComponent(serial));
  return pageMetadata({
    title: `Certificate ${normalized}`,
    description:
      "Verification of a certificate issued by the Computer Science Society, AMU.",
    path: `/certificate/${normalized}`,
  });
}

function formatIssued(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  });
}

export default async function CertificateSerialPage({ params }: Props) {
  const { serial } = await params;
  const normalized = normalizeCertificateSerial(decodeURIComponent(serial));

  let cert: PublicCertificate | null = null;
  let loadError = "";
  try {
    cert = await findCertificateBySerial(normalized);
  } catch {
    loadError = "Could not check this certificate right now. Please try again later.";
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-3xl px-6 py-14 text-center sm:px-8">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Certificate verification
            </p>
            <h1 className="mt-3 break-all font-mono text-2xl font-bold text-[#25297F] sm:text-3xl">
              {normalized}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-6 py-12 sm:px-8">
        {loadError && (
          <p className="rounded-2xl border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-4 py-3 text-sm text-[#8a5f1f]">
            {loadError}
          </p>
        )}

        {!loadError && !cert && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-5 py-5 text-sm text-[#a33a3c]">
            <p className="text-base font-bold">Not a genuine certificate</p>
            <p className="mt-1">
              No certificate with serial number{" "}
              <span className="font-mono font-semibold">{normalized}</span> was
              issued by the Computer Science Society, AMU.
            </p>
          </div>
        )}

        {cert && cert.status !== "valid" && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#CC484A]/30 bg-[#CC484A]/10 px-5 py-5 text-sm text-[#a33a3c]">
            <p className="text-base font-bold">Certificate revoked</p>
            <p className="mt-1">
              This certificate was issued to <strong>{cert.name}</strong> but
              has since been revoked and is no longer valid.
            </p>
          </div>
        )}

        {cert && cert.status === "valid" && (
          <>
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#3CA049]/30 bg-[#3CA049]/10 px-5 py-5 text-sm text-[#2d7a38]">
              <p className="text-base font-bold">✓ Genuine certificate</p>
              <p className="mt-1">
                Issued to <strong>{cert.name}</strong> for the{" "}
                {dayLabel(cert.day_position)} day of {cert.label} on{" "}
                {formatIssued(cert.created_at)}.
              </p>
            </div>
            <CertificateView
              name={cert.name}
              dayPosition={cert.day_position}
              serial={cert.serial}
            />
            <CertificateActions
              filename={`${cert.label}-${cert.name}-${cert.serial}`.replace(
                /\s+/g,
                "-",
              )}
            />
          </>
        )}

        <p className="text-center text-sm">
          <Link
            href="/certificate"
            className="font-semibold text-[#3035B5] hover:underline"
          >
            Verify another certificate
          </Link>
        </p>
      </section>
    </div>
  );
}

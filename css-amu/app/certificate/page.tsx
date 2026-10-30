import Image from "next/image";
import VerifyForm from "@/components/certificate/VerifyForm";
import FadeIn from "@/components/motion/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, webPageJsonLd } from "@/lib/site-seo";
import logo from "@/public/cslogo.png";

const pageTitle = "Certificate verification";
const pageDescription =
  "Check whether a certificate issued by the Computer Science Society, AMU is genuine using the recipient's name or the certificate serial number.";

export const metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/certificate",
  keywords: [
    "CSS AMU certificate",
    "verify certificate",
    "CS360 4.0 certificate",
  ],
});

export default function CertificateVerifyPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageJsonLd({
          name: pageTitle,
          description: pageDescription,
          path: "/certificate",
        })}
      />
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:px-8">
          <FadeIn>
            <Image
              src={logo}
              alt=""
              width={64}
              height={64}
              className="mx-auto h-14 w-14 rounded-2xl shadow-md"
              aria-hidden
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Computer Science Society
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#25297F] sm:text-4xl">
              Certificate verification
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Every certificate we issue has a unique serial number. Enter a
              name or serial number to check whether a certificate is real,
              and to view or download it.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
        <VerifyForm />
      </section>
    </div>
  );
}

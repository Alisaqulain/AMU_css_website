"use client";

import { Libre_Baskerville } from "next/font/google";
import { dayLabel } from "@/lib/cs360";
import { getSiteUrl } from "@/lib/site-seo";
import blankCertificate from "@/public/certificates/cs360-blank.jpg";

const nameFont = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  name: string;
  dayPosition: string;
  serial?: string;
  className?: string;
  id?: string;
};

/**
 * Overlays sit in measured slots that end at each underline.
 * Template 1024×723: name line ≈ 52.7%, day line ≈ 58.4% (gap ≈ 30–50%).
 * Uses a plain <img> so PNG/PDF capture works reliably.
 */
export default function CertificateView({
  name,
  dayPosition,
  serial,
  className = "",
  id = "cs360-certificate",
}: Props) {
  const day = dayLabel(dayPosition);

  return (
    <div
      id={id}
      className={`relative mx-auto w-full max-w-[920px] overflow-hidden bg-white shadow-lg ${className}`}
      style={{
        aspectRatio: `${blankCertificate.width} / ${blankCertificate.height}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={blankCertificate.src}
        alt="CS360 4.0 Certificate of Achievement"
        width={blankCertificate.width}
        height={blankCertificate.height}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        draggable={false}
        crossOrigin="anonymous"
      />

      <div
        className="absolute z-10 flex items-end justify-center overflow-visible"
        style={{
          left: "8%",
          width: "84%",
          top: "44.8%",
          height: "8.0%",
        }}
      >
        <p
          className={`${nameFont.className} m-0 bg-transparent p-0 text-center font-normal italic leading-none text-[#1a1a1a]`}
          style={{
            fontSize: "clamp(1.25rem, 3.6vw, 2.1rem)",
            paddingBottom: "0.12em",
          }}
        >
          {name}
        </p>
      </div>

      <div
        className="absolute z-10 flex items-end justify-center overflow-visible"
        style={{
          left: "30%",
          width: "20%",
          top: "54.2%",
          height: "4.5%",
        }}
      >
        <p
          className={`${nameFont.className} m-0 bg-transparent p-0 text-center font-normal italic leading-none text-[#1a1a1a]`}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            paddingBottom: "0.1em",
          }}
        >
          {day}
        </p>
      </div>

      {serial && (
        <div
          className="absolute z-10 flex flex-col items-center justify-center text-center text-[#25297F]"
          style={{
            left: "33%",
            width: "34%",
            top: "87%",
            height: "6.5%",
          }}
        >
          <p
            className="m-0 font-semibold leading-tight tracking-wide"
            style={{ fontSize: "clamp(0.45rem, 1.15vw, 0.72rem)" }}
          >
            Certificate No. {serial}
          </p>
          <p
            className="m-0 leading-tight text-slate-600"
            style={{ fontSize: "clamp(0.4rem, 0.95vw, 0.6rem)" }}
          >
            Verify at {new URL(getSiteUrl()).host}/certificate
          </p>
        </div>
      )}
    </div>
  );
}

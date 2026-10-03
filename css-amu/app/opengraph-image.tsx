import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteShortName } from "@/lib/site-seo";

export const alt = `${siteShortName} — Computer Science Society, Aligarh Muslim University`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = path.join(process.cwd(), "public", "cslogo.png");
  const logoBuffer = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background:
            "linear-gradient(135deg, #141829 0%, #25297F 42%, #3035B5 70%, #5B2D91 100%)",
          padding: "56px 72px",
        }}
      >
        <img
          src={logoSrc}
          width={200}
          height={200}
          alt=""
          style={{
            borderRadius: 28,
            boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Computer Science Society
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 30,
              fontWeight: 600,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Aligarh Muslim University
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.45,
            }}
          >
            Events, clubs, workshops & membership — AI/ML, Web Dev, Cybersecurity,
            DSA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

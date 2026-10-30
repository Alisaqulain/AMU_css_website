"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

type Props = {
  certificateId?: string;
  filename?: string;
};

async function captureCertificate(certificateId: string): Promise<string> {
  const node = document.getElementById(certificateId);
  if (!node) {
    throw new Error("Certificate not found on the page.");
  }

  // Wait for images + fonts so the capture is sharp
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }),
    ),
  );
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  });
}

export default function CertificateActions({
  certificateId = "cs360-certificate",
  filename = "CS360-4.0-Certificate",
}: Props) {
  const [busy, setBusy] = useState<"pdf" | null>(null);
  const [error, setError] = useState("");

  const safeName = filename.replace(/[^\w.-]+/g, "_");

  const handlePdf = async () => {
    setBusy("pdf");
    setError("");
    try {
      const dataUrl = await captureCertificate(certificateId);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Could not load certificate image."));
        img.src = dataUrl;
      });

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const ratio = Math.min(pageW / img.width, pageH / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      doc.addImage(
        dataUrl,
        "PNG",
        (pageW - w) / 2,
        (pageH - h) / 2,
        w,
        h,
      );
      doc.save(`${safeName}.pdf`);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not download PDF. Try again.",
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 print:hidden">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          disabled={busy !== null}
          onClick={handlePdf}
          className="rounded-xl bg-[#3035B5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#25297F] disabled:opacity-60"
        >
          {busy === "pdf" ? "Preparing…" : "Download PDF"}
        </button>
      </div>
      {error ? (
        <p className="max-w-md text-center text-sm text-[#a33a3c]">{error}</p>
      ) : null}
    </div>
  );
}

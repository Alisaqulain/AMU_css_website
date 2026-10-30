export const CS360_DAY_OPTIONS = ["first", "second", "third"] as const;
export type Cs360Day = (typeof CS360_DAY_OPTIONS)[number];

export const CS360_DAY_LABEL: Record<Cs360Day, string> = {
  first: "First",
  second: "Second",
  third: "Third",
};

export const CERTIFICATE_STATUS_OPTIONS = ["open", "closed", "expired"] as const;
export type CertificateStatus = (typeof CERTIFICATE_STATUS_OPTIONS)[number];

export function isCs360Day(value: string): value is Cs360Day {
  return (CS360_DAY_OPTIONS as readonly string[]).includes(value);
}

export function dayLabel(day: string): string {
  if (isCs360Day(day)) return CS360_DAY_LABEL[day];
  return day;
}

export function randomCertificateCode(length = 8): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export const ISSUED_CERTIFICATE_STATUS_OPTIONS = ["valid", "revoked"] as const;
export type IssuedCertificateStatus =
  (typeof ISSUED_CERTIFICATE_STATUS_OPTIONS)[number];

export const CERTIFICATE_SERIAL_PREFIX = "CSS-";

export function randomCertificateSerial(): string {
  return `${CERTIFICATE_SERIAL_PREFIX}${randomCertificateCode(8)}`;
}

/** Uppercases and adds the CSS- prefix when someone types only the 8 characters. */
export function normalizeCertificateSerial(value: string): string {
  const cleaned = value.trim().toUpperCase().replace(/\s+/g, "");
  if (/^[A-Z0-9]{8}$/.test(cleaned)) {
    return `${CERTIFICATE_SERIAL_PREFIX}${cleaned}`;
  }
  return cleaned;
}

export function looksLikeCertificateSerial(value: string): boolean {
  return /^CSS-[A-Z0-9]{8}$/.test(normalizeCertificateSerial(value));
}

export function certificatePath(serial: string): string {
  return `/certificate/${encodeURIComponent(serial)}`;
}

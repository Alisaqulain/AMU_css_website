/** AMU enrollment number: 2 letters + 4 digits, e.g. GR8512 */
export const ENROLLMENT_PATTERN = /^[A-Z]{2}\d{4}$/;
export const ENROLLMENT_ERROR =
  "Enrollment number must be 2 letters followed by 4 digits (e.g. GR8512).";

export function normalizeEnrollment(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidEnrollment(value: string): boolean {
  return ENROLLMENT_PATTERN.test(normalizeEnrollment(value));
}

export const PHONE_ERROR =
  "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";

/** Strips spaces, dashes and a leading +91 / 91 / 0, leaving the 10-digit number. */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isValidPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(value));
}

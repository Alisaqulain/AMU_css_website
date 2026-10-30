import { permanentRedirect } from "next/navigation";

// Old CS360 verify link; certificates are now verified at /certificate
export default function Cs360VerifyPage() {
  permanentRedirect("/certificate");
}

import { permanentRedirect } from "next/navigation";

// The club interest form is closed; everyone applies through Join the team
export default function InterestPage() {
  permanentRedirect("/membershipForm");
}

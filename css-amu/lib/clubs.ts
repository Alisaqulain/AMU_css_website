export const CLUB_OPTIONS = [
  "AI/ML",
  "Web Development",
  "Cybersecurity",
  "DSA",
] as const;

export type ClubName = (typeof CLUB_OPTIONS)[number];

export const NOT_INTERESTED_LABEL = "Not interested in any club";

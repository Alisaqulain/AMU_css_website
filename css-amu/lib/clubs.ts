export const CLUB_OPTIONS = [
  "Graphics Team",
  "Social Media and PR Team",
  "Volunteer Crew",
  "Technical Team",
  "Editorial Team",
  "Logistics Team",
  "Web Dev Team",
  "AI ML Team",
  "Cyber Team",
] as const;

export type ClubName = (typeof CLUB_OPTIONS)[number];

export const NOT_INTERESTED_LABEL = "Not interested in any team";

/** Alias for team / membership form (same options) */
export const TEAM_OPTIONS = CLUB_OPTIONS;
export type TeamName = ClubName;

export const NOT_INTERESTED_TEAM_LABEL = NOT_INTERESTED_LABEL;

export const TEAM_ACCENT: Record<ClubName, string> = {
  "Graphics Team": "#5B2D91",
  "Social Media and PR Team": "#CC484A",
  "Volunteer Crew": "#3CA049",
  "Technical Team": "#3035B5",
  "Editorial Team": "#B85C38",
  "Logistics Team": "#1F6F8B",
  "Web Dev Team": "#5B2D91",
  "AI ML Team": "#3035B5",
  "Cyber Team": "#CC484A",
};

export const CLUB_ACCENT = TEAM_ACCENT;

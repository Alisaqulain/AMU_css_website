import { CLUB_OPTIONS, type ClubName } from "@/lib/clubs";

export type InterestStatsRow = {
  not_interested: boolean | null;
  club_names: string[] | null;
  club_name: string;
};

export function clubsForInterestRow(row: InterestStatsRow): ClubName[] {
  if (row.not_interested) return [];
  const fromArray = row.club_names?.filter((c): c is ClubName =>
    (CLUB_OPTIONS as readonly string[]).includes(c),
  );
  if (fromArray?.length) return fromArray;
  return row.club_name
    .split(",")
    .map((s) => s.trim())
    .filter((c): c is ClubName =>
      (CLUB_OPTIONS as readonly string[]).includes(c),
    );
}

export type ClubInterestStats = {
  total: number;
  interested: number;
  notInterested: number;
  multipleClubs: number;
  clubCounts: Record<ClubName, number>;
};

export function computeClubInterestStats(
  rows: InterestStatsRow[],
): ClubInterestStats {
  const clubCounts = Object.fromEntries(
    CLUB_OPTIONS.map((c) => [c, 0]),
  ) as Record<ClubName, number>;

  let notInterested = 0;
  let multipleClubs = 0;

  for (const row of rows) {
    if (row.not_interested) {
      notInterested++;
      continue;
    }
    const clubs = clubsForInterestRow(row);
    if (clubs.length > 1) multipleClubs++;
    for (const club of clubs) {
      clubCounts[club]++;
    }
  }

  return {
    total: rows.length,
    interested: rows.length - notInterested,
    notInterested,
    multipleClubs,
    clubCounts,
  };
}

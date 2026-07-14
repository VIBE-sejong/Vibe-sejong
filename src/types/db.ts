export type MemberRole = "admin" | "member";
export type TeamName = "team_1" | "team_2" | "team_3" | "team_4";
export type MemberPart = "design" | "planning" | "dev";

export const TEAM_NAMES: TeamName[] = ["team_1", "team_2", "team_3", "team_4"];
export const MEMBER_PARTS: MemberPart[] = ["design", "planning", "dev"];
export const MEMBER_ROLES: MemberRole[] = ["admin", "member"];

export const TEAM_LABELS: Record<TeamName, string> = {
  team_1: "1팀",
  team_2: "2팀",
  team_3: "3팀",
  team_4: "4팀",
};

export const TEAM_SHORT_LABELS: Record<TeamName, string> = {
  team_1: "1",
  team_2: "2",
  team_3: "3",
  team_4: "4",
};

export const TEAM_AVATAR_CLASSES: Record<TeamName, string> = {
  team_1: "bg-violet-500 text-white",
  team_2: "bg-sky-500 text-white",
  team_3: "bg-amber-500 text-white",
  team_4: "bg-emerald-500 text-white",
};

export const PART_LABELS: Record<MemberPart, string> = {
  design: "디자인",
  planning: "기획",
  dev: "개발",
};

export interface Member {
  id: string;
  student_id: string;
  name: string;
  team: TeamName;
  part: MemberPart;
  role: MemberRole;
  avatar_path: string | null;
  bio: string;
  created_at: string;
  updated_at: string;
}

export interface Week {
  id: string;
  week_number: number;
  title: string;
  description: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityPost {
  id: string;
  week_id: string;
  team: TeamName;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityPostImage {
  id: string;
  activity_post_id: string;
  storage_path: string;
  file_name: string;
  content_type: string | null;
  size_bytes: number | null;
  position: number;
  created_at: string;
}

export interface ActivityPostWithImages extends ActivityPost {
  author: Pick<Member, "id" | "name" | "team">;
  images: (ActivityPostImage & { url: string | null })[];
}

export interface Team {
  team_name: TeamName;
  name: string;
  description: string;
  photo_path: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamPost {
  id: string;
  team: TeamName;
  author_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: Pick<Member, "id" | "name"> | null;
}

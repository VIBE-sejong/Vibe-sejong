import "server-only";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import type { Member, MemberPart, MemberRole, TeamName } from "@/types/db";

export async function findMemberByStudentId(
  studentId: string
): Promise<Member | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error) throw error;
  return data as Member | null;
}

export async function listMembers(): Promise<Member[]> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("team", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Member[];
}

export async function getMemberById(id: string): Promise<Member | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Member | null;
}

export interface CreateMemberInput {
  studentId: string;
  name: string;
  team: TeamName;
  part: MemberPart;
  role: MemberRole;
}

export async function createMember(input: CreateMemberInput): Promise<Member> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("members")
    .insert({
      student_id: input.studentId,
      name: input.name,
      team: input.team,
      part: input.part,
      role: input.role,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Member;
}

export async function deleteMember(id: string): Promise<void> {
  const supabase = getServiceRoleClient();
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw error;
}

export async function updateMember(
  id: string,
  input: CreateMemberInput
): Promise<Member> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("members")
    .update({
      student_id: input.studentId,
      name: input.name,
      team: input.team,
      part: input.part,
      role: input.role,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Member;
}

export interface UpdateMyProfileInput {
  bio: string;
  avatarPath?: string;
}

export async function updateMemberProfile(
  memberId: string,
  input: UpdateMyProfileInput
): Promise<Member> {
  const supabase = getServiceRoleClient();
  const patch: Record<string, unknown> = { bio: input.bio };
  if (input.avatarPath) patch.avatar_path = input.avatarPath;

  const { data, error } = await supabase
    .from("members")
    .update(patch)
    .eq("id", memberId)
    .select("*")
    .single();

  if (error) throw error;
  return data as Member;
}

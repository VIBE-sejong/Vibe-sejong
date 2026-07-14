import "server-only";
import { getServiceRoleClient } from "@/lib/supabase/server-client";
import type { Week } from "@/types/db";

export async function listWeeks(): Promise<Week[]> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("weeks")
    .select("*")
    .order("week_number", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Week[];
}

export async function getWeekById(id: string): Promise<Week | null> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("weeks")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Week | null;
}

export interface CreateWeekInput {
  weekNumber: number;
  title: string;
  description: string;
  createdBy: string;
}

export async function createWeek(input: CreateWeekInput): Promise<Week> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("weeks")
    .insert({
      week_number: input.weekNumber,
      title: input.title,
      description: input.description,
      created_by: input.createdBy,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Week;
}

export interface UpdateWeekInput {
  weekNumber: number;
  title: string;
  description: string;
}

export async function updateWeek(
  id: string,
  input: UpdateWeekInput
): Promise<Week> {
  const supabase = getServiceRoleClient();
  const { data, error } = await supabase
    .from("weeks")
    .update({
      week_number: input.weekNumber,
      title: input.title,
      description: input.description,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Week;
}

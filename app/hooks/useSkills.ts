"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postJSON, putJSON, deleteJSON } from "@/lib/fetchers";

export interface Skill {
  id: string;         // BigInt is serialized as string for client-side
  created_at: string; // DateTime as ISO string
  name?: string;
  category?: string;
  image_url?: string;
}


// Fetch all skills
export function useFetchSkills() {
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: () => fetcher("/api/skill"),
  });
}

// Create skill
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSkill: any) => postJSON("/api/skills", newSkill),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
}

// Update skill
export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skill: any) => putJSON("/api/skills", skill),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
}

// Delete skill
export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJSON("/api/skills", { id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
}

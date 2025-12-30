"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postJSON, putJSON, deleteJSON } from "@/lib/fetchers";

// Fetch all skills
export function useFetchSkills() {
  return useQuery({
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

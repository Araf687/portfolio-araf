"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postJSON, putJSON, deleteJSON } from "@/lib/fetchers";

// Project type
export interface Project {
  id: string; // BigInt serialized as string
  title: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  is_featured?: boolean;
  thumbnail?: string;
  images?: string;
  created_at?: string;
}

// Fetch all projects
export function useFetchProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetcher<Project[]>("/api/project"),
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: Partial<Project>) => postJSON<Project>("/api/project", newProject),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Partial<Project> & { id: string }) => putJSON<Project>("/api/project", project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJSON<Project>("/api/project", { id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

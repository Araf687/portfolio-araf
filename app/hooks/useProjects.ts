"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postJSON, putJSON, deleteJSON } from "@/lib/fetchers";

// Project type
export interface Skill {
  id: string;
  name?: string;
  category?: string;
  image_url?: string;
}

export interface ProjectSkill {
  projectId: string;
  skillId: string;
  skill: Skill;
}

export interface ProjectImage {
  id: string;
  url: string;
}

export interface Project {
  id: string; // BigInt serialized as string
  title: string;
  description?: string;
  github_url?: string;
  live_url?: string;
  is_featured?: boolean;
  thumbnail?: string;
  images?: ProjectImage[]; // Correct type
  skills?: ProjectSkill[];  // Correct type
  created_at?: string;
}

/* ===========================
   Fetch all projects
=========================== */
export function useFetchProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => fetcher<Project[]>("/api/project"),
  });
}

/* ===========================
   Fetch single project
=========================== */
export function useFetchProject(id: string) {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => fetcher<Project>(`/api/project/${id}`),
    enabled: !!id,
  });
}

/* ===========================
   Create project
=========================== */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: Partial<Project>) =>
      postJSON<Project>("/api/project", newProject),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

/* ===========================
   Update project
=========================== */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Partial<Project> & { id: string }) =>
      putJSON<Project>("/api/project", project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

/* ===========================
   Delete project
=========================== */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJSON<Project>("/api/project", { id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}

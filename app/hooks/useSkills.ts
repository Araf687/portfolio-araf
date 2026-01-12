"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postJSON, putJSON, deleteJSON } from "@/lib/fetchers";

/**
 * Skill type (serialized from Prisma)
 */
export interface Skill {
  id: string;          // BigInt → string
  created_at: string;  // Date → ISO string
  name?: string;
  category?: string;
  image_url?: string;
}

/**
 * Create / Update payload
 */
export type SkillPayload = {
  id?: string;         // only for update
  name?: string;
  category?: string;
  image_url?: string;
};

/* =========================
   Fetch all skills
========================= */
export function useFetchSkills() {
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: () => fetcher("/api/skill"),
  });
}

/* =========================
   Create skill
========================= */
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch("/api/skill", {
        method: "POST",
        body: formData, 
      });

      if (!res.ok) {
        throw new Error("Failed to create skill");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill"] });
    },
  });
}


/* =========================
   Update skill
========================= */
export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, SkillPayload>({
    mutationFn: (payload) => putJSON("/api/skill", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skill"] });
    },
  });
}

/* =========================
   Delete skill
========================= */
export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => deleteJSON("/api/skill", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}

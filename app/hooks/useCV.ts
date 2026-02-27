import { fetcher } from "@/lib/fetchers";
import { CV } from "@/types/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ===========================
   Fetch CV
=========================== */
export function useFetchCV() {
  return useQuery<CV>({
    queryKey: ["cv"],
    queryFn: () => fetcher<CV>("/api/cv"),
  });
}


/* ===========================
   Upload / Update CV
=========================== */
export function useUpdateCV() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("cv", file);

      const res = await fetch("/api/cv", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("CV upload failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv"] });
    },
  });
}

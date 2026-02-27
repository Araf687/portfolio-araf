import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ContactMsg {
  id: string;
  name: string;
  email: string;
  message?: string | null;
  created_at: string;
}

// Fetch all messages
export function useFetchMessages() {
  return useQuery<ContactMsg[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
}

// Post new message
export function usePostMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (msg: { name: string; email: string; message?: string }) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
      if (!res.ok) throw new Error("Failed to post message");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contactMessages"] }),
  });
}

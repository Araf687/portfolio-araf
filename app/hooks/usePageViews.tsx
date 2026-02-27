"use client";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetchers";

export interface PageView {
  id: string;
  path?: string;
  ip?: string;
  created_at?: string;
}

export function useFetchPageViews() {
  return useQuery<PageView[]>({
    queryKey: ["pageViews"],
    queryFn: () => fetcher<PageView[]>("/api/page-views"),
  });
}

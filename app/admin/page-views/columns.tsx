"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PageView } from "@/app/hooks/usePageViews";

export const pageViewColumns: ColumnDef<PageView>[] = [
  {
    accessorKey: "path",
    header: "Page Path",
    cell: ({ row }) => row.original.path || "—",
  },
  {
    accessorKey: "ip",
    header: "IP Address",
    cell: ({ row }) => row.original.ip || "—",
  },
  {
    accessorKey: "created_at",
    header: "Visited At",
    cell: ({ row }) =>
      row.original.created_at
        ? new Date(row.original.created_at).toLocaleString()
        : "—",
  },
];

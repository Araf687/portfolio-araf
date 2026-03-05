"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ContactMsg } from "@/app/hooks/useContact";
import { Eye } from "lucide-react";

export const contactColumns = (
  handleView: (msg: ContactMsg) => void
): ColumnDef<ContactMsg>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-gray-200 font-medium">{row.original.name ?? "—"}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-gray-400">{row.original.email ?? "—"}</span>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <span className="text-gray-300 break-words">{row.original.message ?? "—"}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-gray-400 text-sm">
        {row.original.created_at && new Date(row.original.created_at).toLocaleString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row.original)}
            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            <Eye size={16} />
            View
          </button>
        </div>
      );
    },
  },
];

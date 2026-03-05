"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Skill } from "@/types/data";
import { useDeleteSkill } from "@/app/hooks/useSkills";
import { useToast } from "@/context/ToastProvider";

export const skillColumns: ColumnDef<Skill>[] = [
  {
    accessorKey: "name",
    header: "Skill Name",
    cell: ({ row }) => (
      <span className="text-gray-200 font-medium">
        {row.original.name ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="capitalize text-gray-400">
        {row.original.category ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-gray-400 text-sm">
        {row.original.created_at &&
          new Date(row.original.created_at).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const deleteSkill = useDeleteSkill();
      const {showToast}=useToast()

      const handleDelete = async () => {
        const confirmDelete = window.confirm(
          `Are you sure you want to delete skill "${row.original.name}"?`
        );
        if (!confirmDelete) return;

        try {
          await deleteSkill.mutateAsync(row.original.id);
          showToast("success","Skill deleted successfully!");
        } catch (err) {
          console.error("Delete error:", err);
          showToast("error","Failed to delete skill.");
        }
      };

      return (
        <button
          className="text-red-400 hover:text-red-300"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      );
    },
  },
];

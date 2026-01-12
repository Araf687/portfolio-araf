"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil, Trash2, Star } from "lucide-react";
import { Project } from "@/types/data";
import { useDeleteProject } from "@/app/hooks/useProjects";


export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="text-gray-200 font-medium">
        {row.original.title ?? "—"}
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
    accessorKey: "is_featured",
    header: "Featured",
    cell: ({ row }) =>
      row.original.is_featured ? (
        <Star size={16} className="text-yellow-400" />
      ) : (
        <span className="text-gray-500">—</span>
      ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-gray-400 text-sm">
        {row.original.created_at&&new Date(row.original.created_at).toLocaleDateString()}
      </span>
    ),
  },
 {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const deleteProject = useDeleteProject();

    const handleDelete = async () => {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete project "${row.original.title}"?`
      );
      if (!confirmDelete) return;

      try {
        await deleteProject.mutateAsync(row.original.id);
        alert("Project deleted successfully!");
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete project.");
      }
    };

    return (
      <div className="flex gap-3">
        <Link
          href={`/admin/projects/${row.original.id}`}
          className="text-blue-400 hover:text-blue-300"
        >
          <Pencil size={16} />
        </Link>

        <button
          className="text-red-400 hover:text-red-300"
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  },
}

];

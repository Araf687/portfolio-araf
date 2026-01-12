"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { projectColumns } from "./columns";
import { useFetchProjects } from "@/app/hooks/useProjects";
import { Project } from "@/types/data";
import { Modal } from "@/components/admin/modal";
import { ProjectForm } from "@/components/admin/project/ProjectForm";
import { testSupabase } from "@/lib/superbas-client";


const ProjectPage = () => {
  const { data, isLoading } = useFetchProjects();
  const [isModalOpen, setModalOpen] = useState(false);
  testSupabase()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded bg-white text-black text-sm font-semibold"
        >
          + New Project
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : (
        <DataTable<Project, any>
          columns={projectColumns}
          data={data ?? []}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Project"
        width="w-200"
      >
        <ProjectForm closeModal={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProjectPage;

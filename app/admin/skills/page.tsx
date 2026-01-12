"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { skillColumns } from "./columns";
import { useFetchSkills } from "@/app/hooks/useSkills";
import { Skill } from "@/types/data";
import { Modal } from "@/components/admin/modal";
import { SkillForm } from "@/components/admin/skill/SKillForm";


const SkillPage = () => {
  const { data, isLoading } = useFetchSkills();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Skills</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded bg-white text-black text-sm font-semibold"
        >
          + New Skill
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading skills...</p>
      ) : (
        <DataTable<Skill, any>
          columns={skillColumns}
          data={data ?? []}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Skill"
        width="w-120"
      >
        <SkillForm closeModal={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default SkillPage;

"use client";

import { useState, useEffect } from "react";
import { useCreateSkill, useUpdateSkill } from "@/app/hooks/useSkills";
import { Skill } from "@/types/data";
import { useToast } from "@/context/ToastProvider";

type SkillFormProps = {
  closeModal: () => void;
  skill?: Skill;
};

export const SkillForm: React.FC<SkillFormProps> = ({ closeModal, skill }) => {
  const isEdit = Boolean(skill);
  const { showToast } = useToast();


  const [name, setName] = useState(skill?.name ?? "");
  const [category, setCategory] = useState(skill?.category ?? "");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    skill?.image_url ?? null
  );

  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();

  const isLoading = createSkill.isPending || updateSkill.isPending;

  /* =========================
     Image preview cleanup
  ========================= */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* =========================
     Image change handler
  ========================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
     Submit handler
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEdit && skill?.id) {
        formData.append("id", skill.id);
        await updateSkill.mutateAsync(formData as any);
         showToast("success", "Skill updated successfully!");
      } else {
        await createSkill.mutateAsync(formData as any);
            showToast("success", "Skill created successfully!");
      }

      closeModal();
    } catch (error) {
      console.error("Skill submit error:", error);
      showToast("error", "Failed to save skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Skill Name */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Skill Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-white"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-gray-700"
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Skill Image</label>

        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded border border-gray-700"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full border border-gray-700 rounded p-1 text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-white file:text-black
            hover:file:bg-gray-200"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-sm rounded border border-zinc-700 text-gray-300 hover:bg-zinc-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm rounded bg-white text-black font-semibold disabled:opacity-60"
        >
          {isEdit ? "Update Skill" : "Create Skill"}
        </button>
      </div>
    </form>
  );
};

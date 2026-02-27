"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useToast } from "@/context/ToastProvider";
import MultiSelect from "@/components/MultiSelect";
import { useFetchSkills } from "@/app/hooks/useSkills";

export type ProjectFormData = {
  title: string;
  description: string;
  category: "web" | "app";
  github_url?: string;
  live_url?: string;
  is_featured: boolean;
  thumbnail?: File | null;
  images: File[];
  skills: string[];
};

interface ProjectFormProps {
  closeModal: () => void;
  initialData?: Partial<ProjectFormData>;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  closeModal,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<ProjectFormData>({
    defaultValues: {
      images: [],
      skills: [],
      is_featured: false,
      ...initialData,
    },
  });

  const { showToast } = useToast();
  const { data: skills = [], isLoading } = useFetchSkills();

  // Watch images and thumbnail
  const images = watch("images");
  const thumbnail = watch("thumbnail");

  // Preview URLs
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Sync previewImages whenever `images` change
  useEffect(() => {
    setPreviewImages(images.map((file) => URL.createObjectURL(file)));
    // Cleanup URLs on unmount
    return () => previewImages.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  // Sync thumbnail preview
  useEffect(() => {
    if (thumbnail) {
      setThumbnailPreview(URL.createObjectURL(thumbnail));
      return () => URL.revokeObjectURL(thumbnailPreview!);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnail]);

  /* ---------------- Thumbnail ---------------- */
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("thumbnail", file);
  };

  const removeThumbnail = () => setValue("thumbnail", null);

  /* ---------------- Gallery ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setValue("images", [...images, ...newFiles]);
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setValue("images", updatedFiles);
  };

  /* ---------------- Submit ---------------- */
  const onSubmitHandler = async (data: ProjectFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => formData.append("images", file));
      } else if (key === "skills" && Array.isArray(value)) {
        value.forEach((skillId) => formData.append("skills", skillId));
      } else if (key === "thumbnail" && value instanceof File) {
        formData.append("thumbnail", value);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create project");

      showToast("success", "Project created successfully!");
      closeModal();
    } catch (err) {
      showToast("error", (err as Error).message || "Something went wrong");
    }
  };

  const skillOptions = skills.map((skill) => ({
    label: skill.name || "Unnamed",
    value: skill.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5 text-white">
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("title", { required: true })}
          className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Category + Skills */}
      <div className="grid grid-cols-[3fr_1fr] gap-4 items-end">
        {/* Skills */}
        <div>
          <label className="block mb-1 font-medium">Skills</label>
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading skills...</p>
          ) : (
            <MultiSelect
              options={skillOptions}
              placeholder="Select skills"
              onChange={(values) => setValue("skills", values, { shouldValidate: true, shouldDirty: true })}
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-0"
          >
            <option value="web">Web</option>
            <option value="app">Mobile App</option>
          </select>
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="md:col-span-1 flex items-center h-[42px]"> {/* Match height of other inputs */}
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              {...register("is_featured")}
              className="peer sr-only"
            />
            {/* Custom Styled Checkbox */}
            <div className="w-6 h-6 bg-gray-800 border-2 border-gray-700 rounded transition-all 
          peer-checked:bg-indigo-600 peer-checked:border-indigo-600 
          group-hover:border-indigo-400">
            </div>
            {/* Checkmark Icon */}
            <svg
              className="absolute top-1 left-1 w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            Featured
          </span>
        </label>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">GitHub URL</label>
          <input
            {...register("github_url")}
            className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Live URL</label>
          <input
            {...register("live_url")}
            className="w-full rounded px-3 py-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block mb-2 font-medium">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          className="border border-gray-700 bg-gray-800 px-2 py-1.5 w-full rounded focus:outline-none focus:ring-0"
          onChange={handleThumbnailChange}
        />
        {thumbnailPreview && (
          <div className="relative w-30 h-24 mt-2">
            <img src={thumbnailPreview} className="w-full h-full object-cover rounded" />
            <button type="button" onClick={removeThumbnail} className="absolute top-1 right-1 bg-black/70 p-1 rounded">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Gallery */}
      <div>
        <label className="block mb-2 font-medium">Gallery Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="border border-gray-700 bg-gray-800 px-2 py-1.5 w-full rounded focus:outline-none focus:ring-0"
          onChange={handleImageChange}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {previewImages.map((src, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={src} className="w-full h-full object-cover rounded" />
              <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/70 p-1 rounded">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold">
        Save Project
      </button>
    </form>
  );
};

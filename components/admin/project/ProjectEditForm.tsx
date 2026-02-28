"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2, Link as LinkIcon, Github } from "lucide-react";
import { useToast } from "@/context/ToastProvider";
import MultiSelect from "@/components/MultiSelect";
import { useFetchSkills } from "@/app/hooks/useSkills";
import TiptapEditor from "@/components/TextEditor";

export type ProjectFormData = {
  title: string;
  description: string;
  category: "web" | "app";
  github_url?: string;
  live_url?: string;
  is_featured: boolean;
  thumbnail?: File | string | null;
  images: File[];
  skills: string[];
};

interface ProjectFormProps {
  closeModal: () => void;
  initialData: any; 
}

export const ProjectEditForm: React.FC<ProjectFormProps> = ({
  initialData,
  closeModal,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<ProjectFormData>({
    defaultValues: {
      ...initialData,
      images: [], 
      skills: initialData?.skills?.map((s: any) => s.skill.id.toString()) || [],
    },
  });

  const { showToast } = useToast();
  const { data: skills = [], isLoading: skillsLoading } = useFetchSkills();

  // Watchers
  const watchedImages = watch("images");
  const watchedThumbnail = watch("thumbnail");

  // Local State for Previews and Deletions
  const [existingImages, setExistingImages] = useState(initialData?.images || []);
  const [deletedImages, setDeletedImages] = useState<{ id: string; url: string }[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);

  // Sync Thumbnail Preview
  useEffect(() => {
    if (watchedThumbnail instanceof File) {
      const url = URL.createObjectURL(watchedThumbnail);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [watchedThumbnail]);

  /* ---------------- Gallery Handlers ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setValue("images", [...watchedImages, ...newFiles]);

    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (index: number) => {
    const updatedFiles = watchedImages.filter((_, i) => i !== index);
    setValue("images", updatedFiles);

    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (img: { id: string; url: string }) => {
    setDeletedImages((prev) => [...prev, img]);
    setExistingImages((prev: any[]) => prev.filter((item: any) => item.id !== img.id));
  };

  /* ---------------- Submit ---------------- */
  const onSubmitHandler = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append("id", initialData.id);
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("category", data.category);
    formData.append("github_url", data.github_url || "");
    formData.append("live_url", data.live_url || "");
    formData.append("is_featured", String(data.is_featured));

    // Handle Skills
    data.skills.forEach(id => formData.append("skills", id));

    // Handle New Images
    data.images.forEach(file => formData.append("images", file));

    // Handle Deleted Images
    if (deletedImages.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedImages));
    }

    // Handle Thumbnail
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    try {
      const res = await fetch("/api/project", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      showToast("success", "Project updated successfully!");
      closeModal();
      window.location.reload(); 
    } catch (err) {
      showToast("error", "Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillOptions = useMemo(() =>
    skills.map((s: any) => ({ label: s.name, value: s.id.toString() })),
    [skills]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 text-white max-h-[80vh] overflow-y-auto px-2">
      {/* Title */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-400">Project Title</label>
        <input 
          {...register("title", { required: true })} 
          className="w-full rounded-lg px-4 py-2.5 bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition" 
          placeholder="Enter project name"
        />
      </div>

      {/* Description */}
      <div>
         <TiptapEditor
    form={{ setValue, watch }}
    name="description"
    label="Project Description"
  />
      </div>

      {/* Row: Skills, Category, Featured */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-400">Skills Used</label>
          <MultiSelect
            options={skillOptions}
            placeholder="Search skills..."
            onChange={(values) => setValue("skills", values)}
            defaultValue={initialData?.skills?.map((s: any) => s.skill.id.toString())}
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-400">Category</label>
          <select {...register("category")} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 outline-none">
            <option value="web">Web Application</option>
            <option value="app">Mobile App</option>
          </select>
        </div>

        {/* FEATURED CHECKBOX */}
        <div className="flex items-center h-[48px] pl-2">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                {...register("is_featured")}
                className="peer sr-only"
              />
              <div className="w-6 h-6 bg-gray-900 border-2 border-gray-700 rounded transition-all 
                peer-checked:bg-indigo-600 peer-checked:border-indigo-600 
                group-hover:border-indigo-500">
              </div>
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
              Featured Project
            </span>
          </label>
        </div>
      </div>

      {/* Row: Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-400">
            <Github size={14} /> Github URL
          </label>
           <input {...register("github_url")} className="w-full rounded-lg px-4 py-2.5 bg-gray-900 border border-gray-700 focus:border-indigo-500 outline-none" />
        </div>
        <div>
          <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-400">
            <LinkIcon size={14} /> Live Demo URL
          </label>
          <input {...register("live_url")} className="w-full rounded-lg px-4 py-2.5 bg-gray-900 border border-gray-700 focus:border-indigo-500 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Thumbnail Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Main Thumbnail</label>
          <div className="flex items-center gap-4">
            {thumbnailPreview && (
              <div className="relative w-24 h-16 shrink-0">
                <img src={thumbnailPreview} className="w-full h-full object-cover rounded-md border border-gray-700" />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setValue("thumbnail", e.target.files?.[0] || null)} 
              className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 transition" 
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Gallery Images</label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange} 
            className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 transition" 
          />
        </div>
      </div>

      {/* Gallery Previews */}
      <div className="flex flex-wrap gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
        {existingImages.length === 0 && newImagePreviews.length === 0 && (
          <p className="text-xs text-gray-600 italic">No gallery images uploaded.</p>
        )}
        {existingImages.map((img: any) => (
          <div key={img.id} className="relative w-20 h-20 group">
            <img src={img.url} className="w-full h-full object-cover rounded-lg opacity-70 group-hover:opacity-100 transition" />
            <button 
              type="button" 
              onClick={() => removeExistingImage(img)} 
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {newImagePreviews.map((url, i) => (
          <div key={i} className="relative w-20 h-20 group">
            <img src={url} className="w-full h-full object-cover rounded-lg border-2 border-indigo-500 shadow-indigo-500/20 shadow-lg" />
            <button 
              type="button" 
              onClick={() => removeNewImage(i)} 
              className="absolute -top-2 -right-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full p-1 transition"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Updating Project...
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
};
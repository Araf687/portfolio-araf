"use client";

import { useFetchCV, useUpdateCV } from "@/app/hooks/useCV";
import { useRef } from "react";
import { CloudUpload, Pencil } from "lucide-react";

const CV = () => {
  const { data: cv, isLoading } = useFetchCV();
  const { mutate: updateCV, isPending } = useUpdateCV();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (isLoading) return <p>Loading...</p>;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) updateCV(selectedFile);
  };

  const isPDF = cv?.cv_url?.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-4">
      {/* ================= Header with Change CV button ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">CV</h1>

        {cv?.cv_url && (
          <button
            onClick={handleUploadClick}
            disabled={isPending}
            className="px-3 py-2 bg-green-600 text-white rounded
                       hover:bg-green-700 disabled:opacity-50
                       flex items-center gap-2 text-sm"
          >
            <Pencil size={14} />
            {isPending ? "Uploading..." : "Change CV"}
          </button>
        )}
      </div>

      {/* ================= CV EXISTS ================= */}
      {cv?.cv_url ? (
        <div className="rounded-lg overflow-hidden border">
          {isPDF ? (
            <iframe
              src={cv.cv_url}
              className="w-full h-[82vh]"
              title="CV Preview"
            />
          ) : (
            <div className="p-6 flex justify-between items-center bg-gray-100">
              <span className="text-sm">{cv.cv_name}</span>
              <a
                href={cv.cv_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                Open / Download
              </a>
            </div>
          )}
        </div>
      ) : (
        /* ================= NO CV ================= */
        <div
          onClick={handleUploadClick}
          className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors
                     rounded-lg p-10 flex flex-col items-center justify-center
                     text-gray-200 space-y-3"
        >
          <CloudUpload size={42} className="text-gray-300" />
          <p className="text-sm">
            {isPending ? "Uploading..." : "Click to upload your CV"}
          </p>
          <p className="text-xs text-gray-400">
            PDF recommended
          </p>
        </div>
      )}

      {/* 🔒 Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default CV;

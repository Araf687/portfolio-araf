import { supabase } from "@/lib/superbas-client";

export async function uploadFileToSupabase(
  file: File,
  folder: string | null,
  bucket: string
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 6)}.${fileExt}`;

  const filePath = folder
    ? `${folder}/${fileName}` // skills/abc.png
    : fileName; // abc.png (bucket root)

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  // console.log(data);
  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  // console.log("Url:",urlData);
  return urlData.publicUrl;
}

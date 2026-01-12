import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function testSupabase() {
  const { data, error } = await supabase
    .from("project-images") 
    .select("*")
    .limit(1);

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

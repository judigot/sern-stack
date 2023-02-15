import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://YOUR_PROJECT_URL.supabase.co",
  "YOUR_SERVICE_ROLE_SECRET"
);

(async () => {
  try {
    const result: any = await supabase.from("Users").select("first_name");
    console.log(result.data[0]);
  } catch (error: any) {
    throw new Error(error);
  }
})();

export {};

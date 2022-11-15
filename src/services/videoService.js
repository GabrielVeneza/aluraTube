import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://sxaztnnrxvmkwysndwrv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YXp0bm5yeHZta3d5c25kd3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NjE1OTEsImV4cCI6MTk4NDAzNzU5MX0.GeaSgjroxevuf2377ovOSFFwI-xObqr0C3jTUb97meg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}
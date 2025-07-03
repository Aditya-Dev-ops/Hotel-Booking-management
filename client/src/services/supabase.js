
import { createClient } from '@supabase/supabase-js';

 export const supabaseUrl = 'https://fuqkscoqzunexywvjoma.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1cWtzY29xenVuZXh5d3Zqb21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NjE0MDAsImV4cCI6MjAyMzAzNzQwMH0.nSeSPzaqAtQ7v2yKFNrpJmWIioZCmUvuQG9NtKJGxMM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
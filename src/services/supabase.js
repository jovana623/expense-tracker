import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gyttqayagxjrjiidxhsy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5dHRxYXlhZ3hqcmppaWR4aHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDM5NDgsImV4cCI6MjAyNjE3OTk0OH0.05NmR5Go3_XDAkXRaebFUW8CoqHeOktHAWHRjRK9q14";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

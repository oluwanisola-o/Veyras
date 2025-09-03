import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://asnmqwrfilixajgpfoem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbm1xd3JmaWxpeGFqZ3Bmb2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NTgyMDQsImV4cCI6MjA3MjMzNDIwNH0.vzUS0vpykNM1F6lHaUPHmh71WW0_Kw3l6fKpEXetf_s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzmtkvwhwsgvocqviqxj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bXRrdndod3Nndm9jcXZpcXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NDY2NDMsImV4cCI6MjA2OTMyMjY0M30.swStcD5hJ4Ejw5bCyrGbzlikY2KTO64qwV-hIfPS8wY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

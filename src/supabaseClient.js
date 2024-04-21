import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xhyhhrwbzsvgvsntaoou.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoeWhocndienN2Z3ZzbnRhb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MjgwMDQsImV4cCI6MjAyOTMwNDAwNH0.tP6Z-CqtXaMwaWHJ_iek7q6vL9yCoER167ZaR8zW03E'
export const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xckrzdiztfikbumouftl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja3J6ZGl6dGZpa2J1bW91ZnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzgzNjQsImV4cCI6MjA2OTA1NDM2NH0.PuMHWTt1D5a1MPwBXMw-7udgsHSfchktkFFCLQJ66h4'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

export default supabase
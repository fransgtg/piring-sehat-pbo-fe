import { createClient } from '@supabase/supabase-js'

// Mengambil variabel lingkungan dari file .env melalui import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Memberikan peringatan dini jika konfigurasi belum diisi di file .env
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn(
    '[Supabase Client] Peringatan: Hubungkan aplikasi ke proyek Supabase Anda ' +
    'dengan mengisi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY pada file .env!'
  )
}

// Inisialisasi klien Supabase
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
)

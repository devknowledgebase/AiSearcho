import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuration missing in .env.local!")
}

export function createClerkSupabaseClient(getToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: async (url, options = {}) => {
        // Attach Clerk JWT to every Supabase request
        const token = await getToken({ template: 'supabase' })
        
        if (!token) {
          console.error("Clerk token for 'supabase' template is NULL. Please ensure you have created a 'supabase' JWT Template in the Clerk Dashboard.")
        }

        const headers = new Headers(options?.headers)
        headers.set('Authorization', `Bearer ${token}`)
        headers.set('apikey', supabaseAnonKey)
        return fetch(url, { ...options, headers })
      },
    },
  })
}
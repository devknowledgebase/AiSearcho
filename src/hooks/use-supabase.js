import { useAuth } from '@clerk/react'
import { createClerkSupabaseClient } from '../lib/supabaseClient'
import { useMemo } from 'react'

/**
 * A hook that provides a Supabase client instance automatically
 * authenticated with the current Clerk user's session.
 */
export function useSupabase() {
  const { getToken } = useAuth()

  return useMemo(() => {
    return createClerkSupabaseClient(getToken)
  }, [getToken])
}

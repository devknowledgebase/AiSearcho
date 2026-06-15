import { useAuth } from '@clerk/react'
import { createClerkSupabaseClient } from '../lib/supabaseClient'
import { useRef } from 'react'

/**
 * A hook that provides a Supabase client instance automatically
 * authenticated with the current Clerk user's session.
 *
 * The client is cached in a ref so only one GoTrueClient instance is created
 * per component mount, avoiding the "Multiple GoTrueClient instances" warning.
 * Using a ref (instead of useMemo) also prevents re-creation when getToken
 * changes reference between renders.
 */
export function useSupabase() {
  const { getToken } = useAuth()

  // Keep a stable ref to getToken so the client fetch can always call the latest
  const getTokenRef = useRef(getToken)
  getTokenRef.current = getToken

  // Create the client once per mount and reuse it
  const clientRef = useRef(null)
  if (!clientRef.current) {
    clientRef.current = createClerkSupabaseClient(
      (...args) => getTokenRef.current(...args)
    )
  }

  return clientRef.current
}

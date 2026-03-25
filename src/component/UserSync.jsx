import { useEffect } from 'react'
import { useUser } from '@clerk/react'
import { useSupabase } from '../hooks/use-supabase'

/**
 * UserSync component handles the background synchronization of 
 * Clerk user data to the Supabase 'profiles' table.
 */
export default function UserSync() {
  const { user } = useUser()
  const supabase = useSupabase()

  useEffect(() => {
    const syncUser = async () => {
      // Only sync if user is signed in
      if (!user) return

      console.log('UserSync: Syncing profile for', user.id)
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: user.fullName || '',
          email: user.primaryEmailAddress?.emailAddress || '',
          avatar_url: user.imageUrl || '',
          last_seen: new Date().toISOString(),
        }, { onConflict: 'id' })

      if (error) {
        console.error('UserSync Error:', error.message)
        console.error('Tip: Check if you have added an RLS policy for the "profiles" table in Supabase.')
      } else {
        console.log('UserSync: Profile synced successfully.')
      }
    }

    syncUser()
  }, [user, supabase])

  return null // This component doesn't render anything
}

import React, { useEffect } from 'react'
import { useUser } from '@clerk/react'
import Page from './app/dashboard/page.jsx'
import { useSupabase } from './hooks/use-supabase'

export default function Dashboard() {
    return (
      <>
        <div className='page8 dark'>
            <Page />
        </div>
      </>
    )
}
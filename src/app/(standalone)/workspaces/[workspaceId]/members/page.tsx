import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkspaceIdMemberspage = async () => {
 const user = await getCurrent()
 if (!user) redirect('/sign-in')
 return <div></div>
}

export default WorkspaceIdMemberspage

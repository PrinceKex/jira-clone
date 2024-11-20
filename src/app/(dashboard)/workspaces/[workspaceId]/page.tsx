import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import React from 'react'

const WorkspaceIdPage = async ({ params }) => {
 const user = await getCurrent()
 if (!user) redirect('/sign-in')

 return <div>WorkspaceId: {params.workspaceId}</div>
}

export default WorkspaceIdPage

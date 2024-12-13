'use client'

import { PageError } from '@/components/page-error'
import { PageLoader } from '@/components/page-loader'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form'
import { UseWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import React from 'react'

export const WorkspaceIdSettingsClient = () => {
 const workspaceId = UseWorkspaceId()
 const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId })

 if (isLoading) {
  return <PageLoader />
 }
 if (!initialValues) {
  return <PageError message='Project was not found' />
 }
 return (
  <div className='w-full lg:max-w-xl'>
   <EditWorkspaceForm initialValues={initialValues} />
  </div>
 )
}

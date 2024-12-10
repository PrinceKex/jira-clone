'use client'
import { useGetTask } from '@/features/tasks/api/use-get-task'
import { useTaskId } from '@/features/tasks/api/use-task-id'

import React from 'react'

export const TaskIdClient = () => {
 const taskId = useTaskId()
 const { data, isLoading } = useGetTask({ taskId })
 if (isLoading) {
  return <PageLoader />
 }
 return (
  <div>
   <p>Task Id Client</p>
  </div>
 )
}

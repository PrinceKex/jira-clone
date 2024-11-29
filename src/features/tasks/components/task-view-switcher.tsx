'use client'
import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Loader, PlusIcon } from 'lucide-react'
import React from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useGetTasks } from '../api/use-get-task'
import { UseWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useQueryState } from 'nuqs'
import { DataFilters } from './data-filters'
import { useTaskFilters } from '../hooks/use-task-filters'

export const TaskViewSwitcher = () => {
 const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()

 const [view, setView] = useQueryState('task-view', {
  defaultValue: 'table',
 })

 const workspaceId = UseWorkspaceId()
 const { open } = useCreateTaskModal()
 const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
  workspaceId,
  projectId,
  assigneeId,
  status,
  dueDate,
 })
 return (
  <Tabs
   defaultValue={view}
   onValueChange={setView}
   className='flex-1 full-width border rounded-lg'
  >
   <div className='h-full flex flex-col overflow-auto p-4'>
    <div className='flex flex-col gap-y-2 lg:flex-row justify-between items-center'>
     <TabsList className='w-full lg:w-auto'>
      <TabsTrigger className='h-8 w-full lg:w-auto' value='table'>
       Table
      </TabsTrigger>
      <TabsTrigger className='h-8 w-full lg:w-auto' value='kanban'>
       Kanban
      </TabsTrigger>
      <TabsTrigger className='h-8 w-full lg:w-auto' value='calendar'>
       Calender
      </TabsTrigger>
     </TabsList>
     <Button size='sm' className='w-full lg:w-auto' onClick={open}>
      <PlusIcon className='size-4 mr-2' /> New
     </Button>
    </div>
    <DottedSeparator className='my-4' />
    {/* Add Filters */}
    <DataFilters />
    <DottedSeparator className='my-4' />
    {isLoadingTasks ? (
     <div className='w-full border rounded-lg h-[200px] flex flex-col items-center justify-center'>
      <Loader className='size-5 animate-spin text-muted-foreground' />
     </div>
    ) : (
     <>
      <TabsContent value='table' className='mt-0'>
       {JSON.stringify(tasks)}
      </TabsContent>
      <TabsContent value='kanban' className='mt-0'>
       {JSON.stringify(tasks)}
      </TabsContent>
      <TabsContent value='calender' className='mt-0'>
       {JSON.stringify(tasks)}
      </TabsContent>
     </>
    )}
   </div>
  </Tabs>
 )
}

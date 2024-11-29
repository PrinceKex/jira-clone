'use client'
import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'

export const TaskViewSwitcher = () => {
 const { open } = useCreateTaskModal()
 return (
  <Tabs className='flex-1 full-width border rounded-lg'>
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
    Data filters
    <DottedSeparator className='my-4' />
    <>
     <TabsContent value='table' className='mt-0'>
      Data Table
     </TabsContent>
     <TabsContent value='kanban' className='mt-0'>
      Data Kanban
     </TabsContent>
     <TabsContent value='calender' className='mt-0'>
      Data Calender
     </TabsContent>
    </>
   </div>
  </Tabs>
 )
}

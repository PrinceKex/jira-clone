'use client'
import React from 'react'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { ResponsiveModal } from '@/components/responsive-modal'
import { CreateTaskFormWrapper } from './create-task-form-wrapper'

export const CreateTaskModal = () => {
 const { isOpen, setIsOpen } = useCreateTaskModal()
 return (
  <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
   <div>
    {/* TODO: Task Form */}
    <CreateTaskFormWrapper onCancel={close} />
   </div>
  </ResponsiveModal>
 )
}

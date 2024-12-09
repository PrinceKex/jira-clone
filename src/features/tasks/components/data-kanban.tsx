import React, { useCallback, useEffect, useState } from 'react'
import { Task, TaskStatus } from '../types'
import {
 DragDropContext,
 Droppable,
 Draggable,
 type DropResult,
} from '@hello-pangea/dnd'
import { KanbanColumnHeader } from './kanban-column-header'
import { KanbanCard } from './kanban-card'

const boards: TaskStatus[] = [
 TaskStatus.BACKLOG,
 TaskStatus.TODO,
 TaskStatus.IN_PROGRESS,
 TaskStatus.IN_REVIEW,
 TaskStatus.DONE,
]

type TasksState = {
 [key in TaskStatus]: Task[]
}

interface DataKanbanProps {
 data: Task[]
 onChange: (
  tasks: { $id: string; status: TaskStatus; position: number }[]
 ) => void
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
 const [tasks, setTasks] = useState<TasksState>(() => {
  const initialTasks: TasksState = {
   [TaskStatus.BACKLOG]: [],
   [TaskStatus.TODO]: [],
   [TaskStatus.IN_PROGRESS]: [],
   [TaskStatus.IN_REVIEW]: [],
   [TaskStatus.DONE]: [],
  }
  data.forEach((task) => {
   initialTasks[task.status].push(task)
  })

  Object.keys(initialTasks).forEach((status) => {
   initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
  })
  return initialTasks
 })

 useEffect(() => {
  const newTasks: TasksState = {
   [TaskStatus.BACKLOG]: [],
   [TaskStatus.TODO]: [],
   [TaskStatus.IN_PROGRESS]: [],
   [TaskStatus.IN_REVIEW]: [],
   [TaskStatus.DONE]: [],
  }
  data.forEach((task) => {
   newTasks[task.status].push(task)
  })
  Object.keys(newTasks).forEach((status) => {
   newTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
  })
  setTasks(newTasks)
 }, [data])

 const onDragEnd = useCallback(
  (result: DropResult) => {
   const { destination, source } = result
   if (!destination) {
    return
   }

   const sourceStatus = source.droppableId as TaskStatus
   const destStatus = destination.droppableId as TaskStatus

   let updatesPayload: {
    $id: string
    status: TaskStatus
    position: number
   }[] = []
   setTasks((prevTasks) => {
    const newTasks = { ...prevTasks }
    const sourceColumn = [...newTasks[sourceStatus]]

    const [movedTask] = sourceColumn.splice(source.index, 1)
    if (!movedTask) {
     console.error('No task found at source index')
     return prevTasks
    }

    //  create new task
    const updatedMovedTask =
     sourceStatus !== destStatus
      ? { ...movedTask, status: destStatus }
      : movedTask
    // update the source column
    newTasks[sourceStatus] = sourceColumn

    // add task to destination column
    const destColumn = [...newTasks[destStatus]]
    destColumn.splice(destination.index, 0, updatedMovedTask)
    newTasks[destStatus] = destColumn

    updatesPayload = []
    updatesPayload.push({
     $id: updatedMovedTask.$id,
     status: destStatus,
     position: Math.min((destination.index + 1) * 1000, 1_000_000),
    })
    //  update positions for affected tasks in the destination column
    newTasks[destStatus].forEach((task, index) => {
     if (task && task.$id === updatedMovedTask.$id) {
      const newPosition = Math.min((index + 1) * 1000, 1_000_000)
      if (task.position !== newPosition) {
       updatesPayload.push({
        $id: task.$id,
        status: destStatus,
        position: newPosition,
       })
      }
     }
    })
    if (sourceStatus !== destStatus) {
     newTasks[sourceStatus].forEach((task, index) => {
      if (task) {
       const newPosition = Math.min((index + 1) * 1000, 1_000_000)
       if (task.position !== newPosition) {
        updatesPayload.push({
         $id: task.$id,
         status: sourceStatus,
         position: newPosition,
        })
       }
      }
     })
    }
    return newTasks
   })
   // prepare the minimum update payloads
   onChange(updatesPayload)
  },
  [onChange]
 )

 return (
  <DragDropContext onDragEnd={onDragEnd}>
   <div className='flex overflow-x-auto'>
    {boards.map((board) => (
     <div
      key={board}
      className='flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'
     >
      <h2 className='text-sm font-semibold text-muted-foreground'>
       <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
      </h2>
      <Droppable droppableId={board}>
       {(provided) => (
        <div
         {...provided.droppableProps}
         ref={provided.innerRef}
         className='min-h-[200px] py-1.5'
        >
         {tasks[board].map((task, index) => (
          <Draggable key={task.$id} draggableId={task.$id} index={index}>
           {(provided) => (
            <div
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
            >
             <KanbanCard task={task} />
            </div>
           )}
          </Draggable>
         ))}
         {provided.placeholder}
        </div>
       )}
      </Droppable>
     </div>
    ))}
   </div>
  </DragDropContext>
 )
}

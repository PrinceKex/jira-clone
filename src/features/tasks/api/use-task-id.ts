import { useParams } from 'next/navigation'
import React from 'react'

export const useTaskId = () => {
 const params = useParams()
 return params.taskId as string
}

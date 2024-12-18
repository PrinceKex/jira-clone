import { ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { AnalyticsCard } from './analytics-card'
import { DottedSeparator } from './dotted-separator'

// interface AnalyticsProps {
//  date?: {
//   taskCount: number
//   taskDifference: number
//   projectCount?: number
//   projectDifference?: number
//   assignedTaskCount: number
//   assignedTaskDifference: number
//   completedTaskCount: number
//   completedTaskDifference: number
//   incompleteTaskCount?: number
//   incompleteTaskDifference?: number
//   overdueTaskCount: number
//   overdueTaskDifference: number
//  }
// }

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
 return (
  <ScrollArea className='border rounded-lg w-full whitespace-nowrap shrink-0'>
   <div className='w-full flex flex-row'>
    <div className='flex items-center flex-1'>
     <AnalyticsCard
      title='Total Tasks'
      value={data.taskCount}
      variant={data.taskDifference > 0 ? 'up' : 'down'}
      increaseValue={data.taskDifference}
     />
     <DottedSeparator direction='vertical' />
    </div>
    <div className='flex items-center flex-1'>
     <AnalyticsCard
      title='Assigned Tasks'
      value={data.assignedTaskCount}
      variant={data.assignedTaskDifference > 0 ? 'up' : 'down'}
      increaseValue={data.assignedTaskDifference}
     />
     <DottedSeparator direction='vertical' />
    </div>
    <div className='flex items-center flex-1'>
     <AnalyticsCard
      title='Completed Tasks'
      value={data.completedTaskCount}
      variant={data.completedTaskDifference > 0 ? 'up' : 'down'}
      increaseValue={data.completedTaskDifference}
     />
     <DottedSeparator direction='vertical' />
    </div>
    <div className='flex items-center flex-1'>
     <AnalyticsCard
      title='Overdue Tasks'
      value={data.overdueTaskCount}
      variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
      increaseValue={data.overdueTaskDifference}
     />
     <DottedSeparator direction='vertical' />
    </div>
    <div className='flex items-center flex-1'>
     <AnalyticsCard
      title='incomplete Tasks'
      value={data.incompleteTaskCount}
      variant={data.incompleteTaskDifference > 0 ? 'up' : 'down'}
      increaseValue={data.incompleteTaskDifference}
     />
     <DottedSeparator direction='vertical' />
    </div>
   </div>
   <ScrollBar orientation='horizontal' />
  </ScrollArea>
 )
}

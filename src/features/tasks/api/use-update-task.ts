import { client } from '@/lib/rpc'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
 (typeof client.api.tasks)[':taskId']['$patch'],
 200
>
type RequestType = InferRequestType<
 (typeof client.api.tasks)[':taskId']['$patch']
>

export const useUpdateTask = () => {
 const router = useRouter()
 const queryClient = new QueryClient()
 const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn: async ({ param, json }) => {
   const response = await client.api.tasks[':taskId']['$patch']({ param, json })
   if (!response.ok) {
    throw new Error('Failed to update Task')
   }
   return await response.json()
  },
  onSuccess: ({ data }) => {
   toast.success('Task updated successfully')
   router.refresh()
   queryClient.invalidateQueries({ queryKey: ['tasks'] })
   queryClient.invalidateQueries({ queryKey: ['tasks', data.$id] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

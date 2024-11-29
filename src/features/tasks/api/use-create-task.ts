import { client } from '@/lib/rpc'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.tasks)['$post'], 200>
type RequestType = InferRequestType<(typeof client.api.tasks)['$post']>

export const useCreateTask = () => {
 const queryClient = new QueryClient()
 const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn: async ({ json }) => {
   const response = await client.api.tasks['$post']({ json })
   if (!response.ok) {
    throw new Error('Failed to create Task')
   }
   return await response.json()
  },
  onSuccess: () => {
   toast.success('Task created successfully')
   queryClient.invalidateQueries({ queryKey: ['tasks'] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

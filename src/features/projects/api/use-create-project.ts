import { client } from '@/lib/rpc'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.projects)['$post']>
type RequestType = InferRequestType<(typeof client.api.projects)['$post']>

export const useCreateProject = () => {
 const queryClient = new QueryClient()
 const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn: async ({ form }) => {
   const response = await client.api.projects['$post']({ form })
   if (!response.ok) {
    throw new Error('Failed to create Project')
   }
   return await response.json()
  },
  onSuccess: () => {
   toast.success('Project created successfully')
   queryClient.invalidateQueries({ queryKey: ['projects'] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

import { client } from '@/lib/rpc'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
 (typeof client.api.projects)[':projectId']['$patch'],
 200
>
type RequestType = InferRequestType<
 (typeof client.api.projects)[':projectId']['$patch']
>

export const useUpdateProject = () => {
 const router = useRouter()
 const queryClient = new QueryClient()
 const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn: async ({ form, param }) => {
   const response = await client.api.projects[':projectId']['$patch']({
    form,
    param,
   })
   if (!response.ok) {
    throw new Error('Failed to update Project')
   }
   return await response.json()
  },
  onSuccess: ({ data }) => {
   toast.success('Project updated successfully')
   router.refresh()
   queryClient.invalidateQueries({ queryKey: ['projects'] })
   queryClient.invalidateQueries({ queryKey: ['projects', data.$id] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

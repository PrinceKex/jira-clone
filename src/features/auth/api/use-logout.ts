import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>
// type RequestType = InferRequestType<(typeof client.api.auth.logout)['$post']>

export const useLogout = () => {
 const router = useRouter()
 const queryClient = useQueryClient()

 const mutation = useMutation<ResponseType, Error>({
  mutationFn: async () => {
   const response = await client.api.auth.logout['$post']()
   if (!response.ok) {
    throw new Error('Failed to Log Out')
   }
   return await response.json()
  },
  onSuccess: () => {
   toast.success('Logged Out')
   router.refresh()
   // window.location.reload()  this invalidates queries
   queryClient.invalidateQueries({ queryKey: ['current'] })
   queryClient.invalidateQueries({ queryKey: ['workspaces'] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

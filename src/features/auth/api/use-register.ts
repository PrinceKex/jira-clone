import { client } from '@/lib/rpc'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
 (typeof client.api.auth.register)['$post']
>
type RequestType = InferRequestType<(typeof client.api.auth.register)['$post']>

export const useRegister = () => {
 const router = useRouter()
 const queryClient = new QueryClient()
 const mutation = useMutation<ResponseType, Error, RequestType>({
  mutationFn: async ({ json }) => {
   const response = await client.api.auth.register['$post']({ json })

   if (!response.ok) {
    throw new Error('Failed to Register')
   }

   return await response.json()
  },
  onSuccess: () => {
   toast.success('Registered successfully')
   router.refresh()
   queryClient.invalidateQueries({ queryKey: ['current'] })
  },
  onError: (error) => {
   toast.error(error.message)
  },
 })
 return mutation
}

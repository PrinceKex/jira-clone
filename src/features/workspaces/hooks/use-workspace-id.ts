import { useParams } from 'next/navigation'

export const UseWorkspaceId = () => {
 const params = useParams()
 return params.workspaceId as string
}

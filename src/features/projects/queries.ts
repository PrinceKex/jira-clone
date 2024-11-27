// import { cookies } from 'next/headers'
import { Query } from 'node-appwrite'
// import { redirect } from 'next/navigation'
// import { AUTH_COOKIE } from '../auth/constants'
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, WORKSPACES_ID } from '@/config'
import { getMember } from '@/features/members/utils'

import { createSessionClient } from '@/lib/appwrite'
import { Project } from '@/features/projects/types'

// export const getWorkspaces = async () => {
//  try {
//   const { databases, account } = await createSessionClient()
//   const user = await account.get()

//   const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
//    Query.equal('userId', user.$id),
//   ])

//   if (members.total === 0) {
//    return { documents: [], total: 0 }
//   }

//   const workspaceIds = members.documents.map((member) => member.workspaceId)

//   const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
//    Query.orderDesc('$createdAt'),
//    Query.contains('$id', workspaceIds),
//   ])

//   return workspaces
//  } catch {
//   return null
//  }
// }

interface GetProjectProps {
 projectId: string
}

export const getProject = async ({ projectId }: GetProjectProps) => {
 try {
  const { databases, account } = await createSessionClient()
  const user = await account.get()

  const project = await databases.getDocument<Project>(
   DATABASE_ID,
   PROJECTS_ID,
   projectId
  )

  const member = await getMember({
   databases,
   workspaceId: project.workspaceId,
   userId: user.$id,
  })
  if (!member) return null

  return project
 } catch {
  return null
 }
}

// interface GetWorkspaceInfoProps {
//  workspaceId: string
// }

// export const getWorkspaceInfo = async ({
//  workspaceId,
// }: GetWorkspaceInfoProps) => {
//  try {
//   const { databases } = await createSessionClient()
//   // const user = await account.get()

//   // const member = await getMember({ databases, workspaceId, userId: user.$id })
//   // if (!member) return null

//   const workspace = await databases.getDocument<Workspace>(
//    DATABASE_ID,
//    WORKSPACES_ID,
//    workspaceId
//   )

//   return { name: workspace.name }
//  } catch {
//   return null
//  }
// }

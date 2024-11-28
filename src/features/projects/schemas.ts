import { z } from 'zod'

export const createProjectSchema = z.object({
 name: z.string().trim().min(1, 'Required'),
 image: z
  .union([
   z.instanceof(File),
   z.string().transform((value) => (value === '' ? undefined : value)),
  ])
  .optional(),
 WorkspaceId: z.string(),
})

export const updateProjectSchema = z.object({
 name: z.string().trim().min(1, 'Mininum 1 chars Required').optional(),
 image: z
  .union([
   z.instanceof(File),
   z.string().transform((value) => (value === '' ? undefined : value)),
  ])
  .optional(),
})

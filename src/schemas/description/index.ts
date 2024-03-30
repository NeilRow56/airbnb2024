import { z } from 'zod'

export const DescriptionSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

export const CreateDescriptionSchema = DescriptionSchema.omit({ id: true })
export const UpdateDescriptionSchema = DescriptionSchema
export const DeleteDescriptionSchema = DescriptionSchema.pick({ id: true })

export type CreateDescriptionValues = z.infer<typeof CreateDescriptionSchema>
export type UpdateDescriptionValues = z.infer<typeof UpdateDescriptionSchema>
export type DeleteDescriptionValues = z.infer<typeof DeleteDescriptionSchema>

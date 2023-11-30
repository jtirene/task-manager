import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type UpdateInput = z.infer<typeof UpdateInput>
export const UpdateInput = z.object({
	listId: id(),
	name: z.string(),
})

import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type UpdateListInput = z.infer<typeof UpdateListInput>
export const UpdateListInput = z.object({
	listId: id(),
	name: z.string(),
})

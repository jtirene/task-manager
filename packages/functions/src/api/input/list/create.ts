import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type CreateInput = z.infer<typeof CreateInput>
export const CreateInput = z.object({
	listId: id(),
	name: z.string(),
})

import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const CreateListInput = z.object({
	listId: id,
	name: z.string(),
})

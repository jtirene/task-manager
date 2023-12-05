import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type DeleteListInput = z.infer<typeof DeleteListInput>
export const DeleteListInput = z.object({
	listId: id(),
})

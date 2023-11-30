import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type DeleteInput = z.infer<typeof DeleteInput>
export const DeleteInput = z.object({
	listId: id(),
})

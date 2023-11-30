import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type GetByIdInput = z.infer<typeof GetByIdInput>
export const GetByIdInput = z.object({
	listId: id(),
})

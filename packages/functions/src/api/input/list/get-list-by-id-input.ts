import { z } from 'zod'
import { id } from '../../../../../core/src/util/zod'

export type GetListByIdInput = z.infer<typeof GetListByIdInput>
export const GetListByIdInput = z.object({
	listId: id(),
})

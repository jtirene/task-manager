import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const GetListByIdInput = z.object({
	listId: id,
})

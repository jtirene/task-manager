import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const DeleteListInput = z.object({
	listId: id,
})

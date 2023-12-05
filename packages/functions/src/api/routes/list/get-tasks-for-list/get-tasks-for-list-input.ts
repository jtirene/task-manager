import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const GetTasksForListInput = z.object({
	listId: id,
})

import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const DeleteTaskInput = z.object({
	taskId: id,
})

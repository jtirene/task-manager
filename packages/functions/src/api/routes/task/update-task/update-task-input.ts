import { z } from 'zod'
import { id } from '../../../../../../core/src/util/zod'

export const UpdateTaskInput = z.object({
	taskId: id,
	title: z.string().max(255).optional(),
	description: z.string().max(1000).optional(),
	priority: z.enum(['none', 'low', 'medium', 'high', 'critical']).optional(),
	dateStart: z.date().optional(),
	dateEnd: z.date().optional(),
	recurrenceRule: z.string().max(255).optional(),
	dateRecurrenceEnd: z.date().optional(),
})

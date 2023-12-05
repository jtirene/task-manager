import { z } from 'zod'
import {
	TASK_DESCRIPTION_MAX_LENGTH,
	TASK_PRIORITY_OPTIONS,
	TASK_RECURRENCE_RULE_MAX_LENGTH,
	TASK_TITLE_MAX_LENGTH,
} from '../../../../../../core/src/entities/task/task'
import { id } from '../../../../../../core/src/util/zod'

export const UpdateTaskInput = z
	.object({
		taskId: id,
		title: z.string().max(TASK_TITLE_MAX_LENGTH).optional(),
		description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
		priority: z.enum(TASK_PRIORITY_OPTIONS).optional(),
		dateStart: z.date().optional(),
		dateEnd: z.date().optional(),
		recurrenceRule: z.string().max(TASK_RECURRENCE_RULE_MAX_LENGTH).optional(),
		dateRecurrenceEnd: z.date().optional(),
	})
	.refine(
		(schema) =>
			(schema.recurrenceRule && schema.dateRecurrenceEnd) ||
			(!schema.recurrenceRule && !schema.dateRecurrenceEnd),
		{
			message: 'Recurring events require a recurrence end date to be specified',
		},
	)

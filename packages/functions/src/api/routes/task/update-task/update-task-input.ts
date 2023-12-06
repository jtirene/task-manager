import { z } from 'zod'
import {
	TASK_DESCRIPTION_MAX_LENGTH,
	TASK_PRIORITY_OPTIONS,
	TASK_RECURRENCE_RULE_MAX_LENGTH,
	TASK_TITLE_MAX_LENGTH,
} from '../../../../../../core/src/entities/task/task'
import { id } from '../../../../../../core/src/util/zod'

export const UpdateTaskInput = z.object({
	taskId: id,
	title: z.string().max(TASK_TITLE_MAX_LENGTH).optional(),
	description: z.string().max(TASK_DESCRIPTION_MAX_LENGTH).optional(),
	priority: z.enum(TASK_PRIORITY_OPTIONS).optional(),
	dateStart: z.date().optional(),
	dateEnd: z.date().optional(),
	recurrenceRule: z.string().max(TASK_RECURRENCE_RULE_MAX_LENGTH).optional(),
	dateRecurrenceEnd: z.date().optional(),
})
/*
	TODO
	.refine(
		(schema) => {
			if (schema.dateStart || schema.dateEnd)
				return (
					schema.dateStart &&
					schema.dateEnd &&
					schema.dateStart <= schema.dateEnd
				)
			else return true
		},
		{
			message: 'Scheduled events must have a valid start and end date',
		},
	)
	.refine(
		(schema) => {
			if (schema.recurrenceRule || schema.dateRecurrenceEnd)
				return (
					schema.recurrenceRule &&
					schema.dateRecurrenceEnd &&
					schema.dateStart &&
					schema.dateEnd &&
					schema.dateStart <= schema.dateEnd &&
					schema.dateRecurrenceEnd >= schema.dateStart
				)
			else return true
		},
		{
			message:
				'Recurring events must have a valid start date, end date, recurrence rule, and recurrence end date',
		},
	)
	*/

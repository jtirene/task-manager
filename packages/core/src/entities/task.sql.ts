import {
	mysqlEnum,
	mysqlTable,
	primaryKey,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeDeleted, timeUpdated } from '../util/sql'

export const TaskTable = mysqlTable(
	'tm_tasks',
	{
		listId: cuid('list_id').notNull(),
		taskId: cuid('task_id').notNull(),
		timeCreated,
		timeUpdated,
		timeDeleted,
		title: varchar('title', { length: 255 }).notNull(),
		description: varchar('description', { length: 1000 }).notNull(),
		dueDate: timestamp('due_date', {
			mode: 'string',
		}).notNull(),
		priority: mysqlEnum('priority', [
			'none',
			'low',
			'medium',
			'high',
			'critical',
		]).notNull(),
	},
	(table) => ({
		primary: primaryKey(table.listId, table.taskId),
	}),
)

export const Task = createSelectSchema(TaskTable)
export const InsertTask = createInsertSchema(TaskTable)

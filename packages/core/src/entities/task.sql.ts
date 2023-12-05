import {
	mysqlEnum,
	mysqlTable,
	primaryKey,
	varchar,
} from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid, timeCreated, timeUpdated } from '../util/sql'

export const Tasks = mysqlTable(
	'tm_tasks',
	{
		listId: cuid('list_id').notNull(),
		taskId: cuid('task_id').notNull(),
		timeCreated,
		timeUpdated,
		title: varchar('title', { length: 255 }).notNull(),
		description: varchar('description', { length: 1000 }).notNull(),
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

export const Task = createSelectSchema(Tasks)
export const InsertTask = createInsertSchema(Tasks)

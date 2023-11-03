import {
	mysqlEnum,
	mysqlTable,
	primaryKey,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core'
import { cuid, timestamps } from '../util/sql'

export const tasks = mysqlTable(
	'tm_tasks',
	{
		listId: cuid('list_id').notNull(),
		taskId: cuid('task_id').notNull(),
		...timestamps,
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
	})
)

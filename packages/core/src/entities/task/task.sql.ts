import { relations, sql } from 'drizzle-orm'
import {
	datetime,
	mysqlEnum,
	mysqlTable,
	primaryKey,
	varchar,
} from 'drizzle-orm/mysql-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { cuid } from '../../util/sql'
import { Lists } from '../list/list.sql'
import {
	TASK_DESCRIPTION_MAX_LENGTH,
	TASK_RECURRENCE_RULE_MAX_LENGTH,
	TASK_TITLE_MAX_LENGTH,
} from './task'

export const Tasks = mysqlTable(
	'tm_tasks',
	{
		listId: cuid('list_id').notNull(),
		taskId: cuid('task_id').notNull(),
		dateCreated: datetime('date_created')
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		dateUpdated: datetime('date_updated')
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),

		// content fields
		title: varchar('title', { length: TASK_TITLE_MAX_LENGTH }).notNull(),
		description: varchar('description', {
			length: TASK_DESCRIPTION_MAX_LENGTH,
		}),
		priority: mysqlEnum('priority', [
			'none',
			'low',
			'medium',
			'high',
			'critical',
		]).notNull(),

		// iCalendar fields
		dateStart: datetime('date_start').notNull(),
		dateEnd: datetime('date_end').notNull(),
		recurrenceRule: varchar('recurrence_rule', {
			length: TASK_RECURRENCE_RULE_MAX_LENGTH,
		}),
		dateRecurrenceEnd: datetime('date_recurrence_end'),
	},
	(table) => ({
		primary: primaryKey(table.listId, table.taskId),
	}),
)

export const TasksRelations = relations(Tasks, ({ one }) => ({
	list: one(Lists, {
		fields: [Tasks.listId],
		references: [Lists.listId],
	}),
}))

export const Task = createSelectSchema(Tasks)
export const InsertTask = createInsertSchema(Tasks)

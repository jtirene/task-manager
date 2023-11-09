export * as TaskLists from './index'
import { eq, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'
import { zod } from '../zod'
import { id } from './../zod'
import { taskLists } from './task-list.sql'

export const TaskList = createSelectSchema(taskLists)
export const CreateTaskList = createInsertSchema(taskLists)

export const create = zod(CreateTaskList, async (input) => {
	await db.insert(taskLists).values(input)
})

export const update = zod(
	z.object({
		listId: id(),
		payload: CreateTaskList.pick({
			name: true,
		}),
	}),
	async (input) => {
		await db
			.update(taskLists)
			.set(input.payload)
			.where(eq(taskLists.listId, input.listId))
	},
)

export const softDelete = zod(z.object({ listId: id() }), async (input) => {
	await db
		.update(taskLists)
		.set({
			// TODO is this the right way to do this?
			timeDeleted: sql`CURRENT_TIMESTAMP`,
		})
		.where(eq(taskLists.listId, input.listId))
})

export const restore = zod(z.object({ listId: id() }), async (input) => {
	await db
		.update(taskLists)
		.set({
			timeDeleted: null,
		})
		.where(eq(taskLists.listId, input.listId))
})

export const getAll = zod(
	z.object({
		ownerId: id(),
		limit: z.number(),
	}),
	async (input) => {
		return await db
			.select()
			.from(taskLists)
			.where(eq(taskLists.ownerId, input.ownerId))
			.limit(input.limit)
	},
)

export const getById = zod(
	z.object({
		listId: id(),
	}),
	async (input) => {
		return await db.query.taskLists.findFirst({
			where: eq(taskLists.listId, input.listId),
		})
	},
)

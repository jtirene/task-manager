export * as TaskLists from './index'
import { eq } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { taskLists } from '../../entities/task-list.sql'
import { db } from '../../util/db'
import { id, zod } from '../../util/zod'

export const TaskList = createSelectSchema(taskLists)
export const InsertTaskList = createInsertSchema(taskLists)

export const create = zod(InsertTaskList, async (input) => {
	await db.insert(taskLists).values(input)
})

export const update = zod(
	z.object({
		listId: id(),
		payload: InsertTaskList.pick({
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

export const deleteList = zod(z.object({ listId: id() }), async (input) => {
	await db.delete(taskLists).where(eq(taskLists.listId, input.listId))
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

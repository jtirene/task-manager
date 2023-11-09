export * as TaskList from './index'

import { eq, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../db'
import { id, zod } from '../zod'
import { taskLists } from './task-list.sql'

export type List = z.infer<typeof List>
export const List = createSelectSchema(taskLists)

export type CreateList = z.infer<typeof CreateList>
export const CreateList = createInsertSchema(taskLists)
export const create = zod(CreateList, async (input) => {
	await db.insert(taskLists).values(input)
})

export type UpdateList = z.infer<typeof UpdateList>
export const UpdateList = z.object({
	listId: id(),
	payload: CreateList.pick({
		name: true,
	}),
})
export const update = zod(UpdateList, async (input) => {
	await db
		.update(taskLists)
		.set(input.payload)
		.where(eq(taskLists.listId, input.listId))
})

export type SoftDeleteList = z.infer<typeof SoftDeleteList>
export const SoftDeleteList = z.object({ listId: id() })
export const softDelete = zod(SoftDeleteList, async (input) => {
	await db
		.update(taskLists)
		.set({
			// TODO is this the right way to do this?
			timeDeleted: sql`CURRENT_TIMESTAMP`,
		})
		.where(eq(taskLists.listId, input.listId))
})

export type RestoreList = z.infer<typeof RestoreList>
export const RestoreList = z.object({ listId: id() })
export const restore = zod(RestoreList, async (input) => {
	await db
		.update(taskLists)
		.set({
			timeDeleted: null,
		})
		.where(eq(taskLists.listId, input.listId))
})

export type GetAll = z.infer<typeof GetAll>
export const GetAll = z.object({ limit: z.number().optional().default(100) })
export const getAll = zod(GetAll, async (input) => {
	return await db.select().from(taskLists).limit(input.limit)
})

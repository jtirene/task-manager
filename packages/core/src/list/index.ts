export * as Lists from './index'

import { eq, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '../util/db'
import { zod } from '../util/zod'
import { lists } from './list.sql'

export type List = z.infer<typeof List>
export const List = createSelectSchema(lists)

export type CreateList = z.infer<typeof CreateList>
export const CreateList = createInsertSchema(lists)

export type UpdateList = z.infer<typeof UpdateList>
export const UpdateList = CreateList.pick({
	name: true,
})

export const create = zod(CreateList, async (input) => {
	await db.transaction(async (tx) => {
		tx.insert(lists).values(input)
	})
})

export const update = zod(
	z.object({
		listId: z.string().cuid2(),
		payload: UpdateList,
	}),
	async (input) => {
		await db.transaction(async (tx) => {
			tx.update(lists).set(input.payload).where(eq(lists.listId, input.listId))
		})
	}
)

export const softDelete = zod(
	z.object({ listId: z.string().cuid2() }),
	async (input) => {
		await db.transaction(async (tx) => {
			tx.update(lists)
				.set({
					timeDeleted: null,
				})
				.where(eq(lists.listId, input.listId))
		})
	}
)

export const restore = zod(
	z.object({ listId: z.string().cuid2() }),
	async (input) => {
		await db.transaction(async (tx) => {
			tx.update(lists)
				.set({
					// TODO is this the right way to do this?
					timeDeleted: sql`CURRENT_TIMESTAMP`,
				})
				.where(eq(lists.listId, input.listId))
		})
	}
)

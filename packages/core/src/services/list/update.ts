import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { InsertList, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type UpdateInput = z.infer<typeof UpdateInput>
const UpdateInput = InsertList.pick({
	listId: true,
	name: true,
})

export const Update = createServiceFunction(
	UpdateInput,
	async ({ listId, name }) => {
		await db.update(Lists).set({ name }).where(eq(Lists.listId, listId))
	},
)

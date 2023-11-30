import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { List, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type DeleteInput = z.infer<typeof DeleteInput>
const DeleteInput = List.pick({
	listId: true,
})

export const Delete = createServiceFunction(DeleteInput, async ({ listId }) => {
	await db.delete(Lists).where(eq(Lists.listId, listId))
})

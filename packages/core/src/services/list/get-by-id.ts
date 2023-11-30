import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'
import { id } from '../../util/zod'

type GetByIdInput = z.infer<typeof GetByIdInput>
const GetByIdInput = z.object({
	listId: id(),
})

export const GetById = createServiceFunction(
	GetByIdInput,
	async ({ listId }) => {
		return await db.query.taskLists.findFirst({
			where: eq(Lists.listId, listId),
		})
	},
)

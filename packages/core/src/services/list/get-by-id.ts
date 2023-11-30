import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'
import { id } from '../../util/zod'

export const GetById = createServiceFunction(
	z.object({
		listId: id(),
	}),
	async ({ listId }) => {
		return await db.query.taskLists.findFirst({
			where: eq(Lists.listId, listId),
		})
	},
)

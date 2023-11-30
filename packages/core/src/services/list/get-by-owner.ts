import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { List, Lists } from '../../entities/list.sql.js'
import { db } from '../../util/db'
import { createServiceFunction } from '../../util/service'

type GetByOwnerInput = z.infer<typeof GetByOwnerInput>
const GetByOwnerInput = z.object({
	ownerId: List.shape.ownerId,
	limit: z.number().min(1),
})

export const GetByOwner = createServiceFunction(
	GetByOwnerInput,
	async ({ ownerId, limit }) => {
		return await db
			.select()
			.from(Lists)
			.where(eq(Lists.ownerId, ownerId))
			.limit(limit)
	},
)

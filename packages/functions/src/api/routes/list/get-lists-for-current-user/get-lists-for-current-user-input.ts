import { z } from 'zod'

export const GetListsForCurrentUserInput = z.object({
	limit: z.number().min(1),
})

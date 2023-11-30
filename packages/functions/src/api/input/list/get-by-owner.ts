import { z } from 'zod'

export type GetForCurrentUserInput = z.infer<typeof GetForCurrentUserInput>
export const GetForCurrentUserInput = z.object({
	limit: z.number().min(1),
})

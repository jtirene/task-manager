import { z } from 'zod'

export type GetListsForCurrentUserInput = z.infer<
	typeof GetListsForCurrentUserInput
>
export const GetListsForCurrentUserInput = z.object({
	limit: z.number().min(1),
})

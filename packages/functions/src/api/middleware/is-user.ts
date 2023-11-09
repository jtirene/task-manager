import { TRPCError } from '@trpc/server'
import { isAuthenticated } from './is-authenticated'

export const isUser = isAuthenticated.unstable_pipe((opts) => {
	const { ctx, next } = opts

	const userId = ctx.user.id
	if (!userId) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: `Missing user id for user sub ${ctx.user.sub}`,
		})
	}

	return next({
		ctx: {
			user: {
				id: userId,
				sub: ctx.user.sub,
			},
		},
	})
})

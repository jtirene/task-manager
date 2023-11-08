import { privateProcedure } from '../procedure/private-procedure'
import { trpc } from '../trpc'
import { clerkClient } from '../util/clerk'

export const userProfile = trpc.router({
	create: privateProcedure.mutation(async ({ ctx }) => {
		await clerkClient.users.updateUserMetadata(ctx.user.id, {
			publicMetadata: {
				userId: '1234567',
			},
		})
	}),
})

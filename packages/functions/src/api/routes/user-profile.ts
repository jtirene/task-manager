import { createId } from '@paralleldrive/cuid2'
import { UserProfile } from '../../../../core/src/user-profile'
import { privateProcedure } from '../procedure/private-procedure'
import { trpc } from '../trpc'
import { clerkClient } from '../util/clerk'

export const userProfile = trpc.router({
	create: privateProcedure.mutation(async ({ ctx }) => {
		const userId = createId()
		await UserProfile.create({
			userId,
			userSub: ctx.user.id,
		})
		// TODO
		// if this fails, user will never be able to recover
		// because profile creation will fail
		await clerkClient.users.updateUserMetadata(ctx.user.id, {
			publicMetadata: {
				userId,
			},
		})
	}),
})

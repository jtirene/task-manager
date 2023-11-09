import { createId } from '@paralleldrive/cuid2'
import { UserProfile } from '../../../../core/src/user-profile'
import { clerkClient } from '../clerk'
import { privateProcedure } from '../procedure/private-procedure'
import { trpc } from '../trpc'

export const userProfile = trpc.router({
	create: privateProcedure.mutation(async ({ ctx }) => {
		const user = await clerkClient.users.getUser(ctx.user.id)
		const primaryEmailAddress = user.emailAddresses.find(
			(e) => e.id === user.primaryEmailAddressId
		)
		if (!primaryEmailAddress)
			throw new Error(`no primary email address found for user: ${ctx.user.id}`)

		const userId = createId()
		await UserProfile.create({
			userId,
			userSub: ctx.user.id,
			email: primaryEmailAddress.emailAddress,
			// TODO collect this as input
			notificationsEnabled: false,
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
	getMyProfile: privateProcedure.query(async ({ ctx }) => {
		return await UserProfile.get({ userSub: ctx.user.id })
	}),
})

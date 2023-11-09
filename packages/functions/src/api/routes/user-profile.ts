import { createId } from '@paralleldrive/cuid2'
import { UserProfile } from '../../../../core/src/user-profile'
import { clerkClient } from '../clerk'
import { privateProcedure } from '../procedure/private-procedure'
import { trpc } from '../trpc'

export const userProfile = trpc.router({
	create: privateProcedure.mutation(async ({ ctx }) => {
		const userId = createId()

		let authUser = await clerkClient.users.getUser(ctx.user.id)
		if (!authUser.publicMetadata.userId) {
			await clerkClient.users.updateUserMetadata(ctx.user.id, {
				publicMetadata: {
					userId,
				},
			})
		}

		const primaryEmailAddress = authUser.emailAddresses.find(
			(e) => e.id === authUser.primaryEmailAddressId
		)
		if (!primaryEmailAddress)
			throw new Error(`no primary email address found for user: ${ctx.user.id}`)

		await UserProfile.create({
			userId,
			userSub: ctx.user.id,
			email: primaryEmailAddress.emailAddress,
			notificationsEnabled: false,
		})
	}),
	getMyProfile: privateProcedure.query(async ({ ctx }) => {
		return await UserProfile.get({ userSub: ctx.user.id })
	}),
})

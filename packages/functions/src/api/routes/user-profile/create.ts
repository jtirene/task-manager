import { createId } from '@paralleldrive/cuid2'
import { UserProfile } from '../../../../../core/src/services/user-profile'
import { clerkClient } from '../../clerk'
import { privateProcedure } from '../../procedure/private-procedure'

export const create = privateProcedure.mutation(async ({ ctx }) => {
	const userSub = ctx.user.sub
	const clerkUser = await clerkClient.users.getUser(userSub)

	const primaryEmailAddress = clerkUser.emailAddresses.find(
		(e) => e.id === clerkUser.primaryEmailAddressId,
	)
	if (!primaryEmailAddress)
		throw new Error(`no primary email address found for user: ${userSub}`)

	if (!clerkUser.publicMetadata.userId) {
		let userId = createId()
		try {
			await UserProfile.create({
				userId,
				userSub,
				email: primaryEmailAddress.emailAddress,
				firstName: clerkUser.firstName,
				profilePicture: clerkUser.imageUrl,
				notificationsEnabled: false,
			})
		} catch (error) {
			userId = (await UserProfile.getBySub({ userSub })).userId
		}
		await clerkClient.users.updateUser(clerkUser.id, {
			publicMetadata: {
				userId,
			},
		})
	}
})

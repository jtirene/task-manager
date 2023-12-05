import { Profile } from '../../entities/profile.sql'
import { clerkClient } from '../../util/clerk'
import { createServiceFunction } from '../../util/service'

export const GetClerkUserBySub = createServiceFunction(
	Profile.pick({
		userSub: true,
	}),
	async ({ userSub }) => {
		const clerkUser = await clerkClient.users.getUser(userSub)

		const primaryEmailAddress = clerkUser.emailAddresses.find(
			(e) => e.id === clerkUser.primaryEmailAddressId,
		)
		if (!primaryEmailAddress)
			throw new Error(`no primary email address found for user: ${userSub}`)

		return {
			...clerkUser,
			primaryEmailAddress,
		}
	},
)

import { Profile } from '../../entities/profile.sql'
import { clerkClient } from '../../util/clerk'
import { createServiceFunction } from '../../util/service'

const GetBySubInput = Profile.pick({
	userSub: true,
})

export const GetBySub = createServiceFunction(
	GetBySubInput,
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

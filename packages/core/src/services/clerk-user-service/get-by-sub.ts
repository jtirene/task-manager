import { z } from 'zod'
import { UserProfile } from '../../entities/user-profile.sql'
import { clerkClient } from '../../util/clerk'
import { validate } from '../../util/zod'

export type GetBySubInput = z.infer<typeof GetBySubInput>
export const GetBySubInput = UserProfile.pick({
	userSub: true,
})

export const GetBySub = validate(GetBySubInput, async ({ userSub }) => {
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
})

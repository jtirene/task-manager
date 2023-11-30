import { createId } from '@paralleldrive/cuid2'
import {
	getClerkUser,
	setClerkUserId,
} from '../../../../../core/src/services/clerk-user'
import { UserProfile } from '../../../../../core/src/services/user-profile'
import { privateProcedure } from '../../procedure/private-procedure'

export const createUserProfile = privateProcedure.mutation(async ({ ctx }) => {
	const userSub = ctx.user.sub
	const clerkUser = await getClerkUser(userSub)

	if (!clerkUser.publicMetadata.userId) {
		let userId = createId()
		try {
			await UserProfile.create({
				userId,
				userSub,
				email: clerkUser.primaryEmailAddress.emailAddress,
				firstName: clerkUser.firstName,
				profilePicture: clerkUser.imageUrl,
				notificationsEnabled: false,
			})
		} catch (error) {
			userId = (await UserProfile.getBySub({ userSub })).userId
		}
		setClerkUserId(userSub, userId)
	}
})

import { createId } from '@paralleldrive/cuid2'
import {
	getClerkUser,
	setClerkUserId,
} from '../../../../../core/src/services/clerk-user'
import { UserProfile } from '../../../../../core/src/services/user-profile'
import { privateProcedure } from '../../procedure/private-procedure'

export const CreateUserProfile = privateProcedure.mutation(
	async ({ ctx: { user } }) => {
		const clerkUser = await getClerkUser(user.sub)
		if (!clerkUser.publicMetadata.userId) {
			let userId = createId()
			try {
				await UserProfile.create({
					userId,
					userSub: user.sub,
					email: clerkUser.primaryEmailAddress.emailAddress,
					firstName: clerkUser.firstName,
					profilePicture: clerkUser.imageUrl,
					notificationsEnabled: false,
				})
			} catch (error) {
				userId = (await UserProfile.getBySub({ userSub: user.sub })).userId
			}
			setClerkUserId(user.sub, userId)
		}
	},
)

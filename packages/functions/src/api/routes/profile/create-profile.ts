import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Profiles } from '../../../../../core/src/entities/profile.sql'
import { GetClerkUserBySub } from '../../../../../core/src/services/clerk/get-clerk-user-by-sub'
import { SetClerkUserMetadata } from '../../../../../core/src/services/clerk/set-clerk-user-metadata'
import { db } from '../../../../../core/src/util/db'
import { PrivateProcedure } from '../../procedure/private-procedure'

export const CreateProfile = PrivateProcedure.mutation(
	async ({
		ctx: {
			user: { sub },
		},
	}) => {
		const clerkUser = await GetClerkUserBySub.execute({
			userSub: sub,
		})
		if (!clerkUser.publicMetadata.userId) {
			let userId = createId()
			try {
				await db.insert(Profiles).values({
					userId,
					userSub: sub,
					email: clerkUser.primaryEmailAddress.emailAddress,
					firstName: clerkUser.firstName,
					profilePicture: clerkUser.imageUrl,
					notificationsEnabled: false,
				})
			} catch (error) {
				const profile = await db.query.userProfiles.findFirst({
					where: eq(Profiles.userSub, sub),
				})
				if (!profile)
					throw new TRPCError({
						code: 'INTERNAL_SERVER_ERROR',
						message: `No profile found for userSub: ${sub}`,
					})
				userId = profile.userId
			}
			await SetClerkUserMetadata.execute({
				userSub: sub,
				userId,
			})
		}
	},
)

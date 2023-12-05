import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Profiles } from '../../../../../core/src/entities/profile/profile.sql'
import { db } from '../../../../../core/src/util/db'
import { UserProcedure } from '../../procedure/user-procedure'

export const GetCurrentUserProfile = UserProcedure.query(
	async ({
		ctx: {
			user: { id },
		},
	}) => {
		const profile = await db.query.userProfiles.findFirst({
			where: eq(Profiles.userId, id),
		})
		if (!profile)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `No profile found for userId: ${id}`,
			})
		return profile
	},
)

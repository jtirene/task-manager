import { z } from 'zod'
import {
	InsertUserProfile,
	UserProfileTable,
} from '../../entities/user-profile.sql'
import { db } from '../../util/db'
import { validate } from '../../util/zod'

export type CreateUserProfileInput = z.infer<typeof CreateUserProfileInput>
export const CreateUserProfileInput = InsertUserProfile

export const CreateUserProfile = validate(
	CreateUserProfileInput,
	async (input) => {
		await db.insert(UserProfileTable).values(input)
	},
)

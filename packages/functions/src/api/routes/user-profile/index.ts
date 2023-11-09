import { trpc } from '../../trpc'
import { create } from './create'
import { getMyProfile } from './get-my-profile'

export const userProfile = trpc.router({
	create,
	getMyProfile,
})

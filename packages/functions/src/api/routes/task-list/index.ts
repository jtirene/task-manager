import { trpc } from '../../trpc'
import { create } from './create'
import { getAllOwnedByUser } from './get-all-owned-by-user'
import { update } from './update'

export const taskList = trpc.router({
	create,
	update,
	getAllOwnedByUser,
})

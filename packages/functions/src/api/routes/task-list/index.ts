import { trpc } from '../../trpc'
import { create } from './create'
import { deleteList } from './delete-list'
import { getAllOwnedByUser } from './get-all-owned-by-user'
import { getById } from './get-by-id'
import { update } from './update'

export const taskList = trpc.router({
	create,
	update,
	delete: deleteList,
	getAllOwnedByUser,
	getById,
})

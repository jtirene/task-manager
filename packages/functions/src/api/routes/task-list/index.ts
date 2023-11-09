import { trpc } from '../../trpc'
import { create } from './create'
import { getAll } from './get-all'
import { update } from './update'

export const taskList = trpc.router({
	create,
	update,
	getAll,
})

import { trpc } from '../../util/trpc'
import { Create } from './create'
import { Delete } from './delete'
import { GetById } from './get-by-id'
import { GetForCurrentUser } from './get-by-owner'
import { Update } from './update'

export const List = trpc.router({
	Create,
	Delete,
	GetById,
	GetForCurrentUser,
	Update,
})

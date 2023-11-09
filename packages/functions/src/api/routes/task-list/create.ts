import { CreateList, TaskList } from '../../../../../core/src/task-list'
import { publicProcedure } from '../../procedure/public-procedure'

export const create = publicProcedure.input(CreateList).mutation((ctx) => {
	TaskList.create(ctx.input)
})

import { GetAll, TaskList } from '../../../../../core/src/task-list'
import { publicProcedure } from '../../procedure/public-procedure'

export const getAll = publicProcedure.input(GetAll).query(async (ctx) => {
	return await TaskList.getAll(ctx.input)
})

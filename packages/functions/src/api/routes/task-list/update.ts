import { TaskList, UpdateList } from '../../../../../core/src/task-list'
import { publicProcedure } from '../../procedure/public-procedure'

export const update = publicProcedure.input(UpdateList).mutation((ctx) => {
	TaskList.update(ctx.input)
})

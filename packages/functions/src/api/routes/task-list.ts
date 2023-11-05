import {
	CreateList,
	RestoreList,
	SoftDeleteList,
	TaskList,
	UpdateList,
} from '../../../../core/src/task-list'
import { publicProcedure } from '../procedures'
import { trpc } from '../trpc'

export const taskList = trpc.router({
	create: publicProcedure.input(CreateList).mutation((ctx) => {
		TaskList.create(ctx.input)
	}),
	update: publicProcedure.input(UpdateList).mutation((ctx) => {
		TaskList.update(ctx.input)
	}),
	softDelete: publicProcedure.input(SoftDeleteList).mutation((ctx) => {
		TaskList.softDelete(ctx.input)
	}),
	restore: publicProcedure.input(RestoreList).mutation((ctx) => {
		TaskList.restore(ctx.input)
	}),
})

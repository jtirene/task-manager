import { trpc } from './util/trpc'

export const TaskLists = () => {
	const taskLists = trpc.taskList.getAll.useQuery({})

	if (taskLists.isLoading) return <div>Loading...</div>
	if (taskLists.isError) return <div>Error: {taskLists.error.message}</div>

	return (
		<div>
			<h1>Task Lists</h1>
			<ul>
				{taskLists.data?.map((taskList) => {
					return <li key={taskList.listId}>{taskList.name}</li>
				})}
			</ul>
		</div>
	)
}

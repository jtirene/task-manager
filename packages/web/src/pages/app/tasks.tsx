import { trpc } from '../../util/trpc'

export default function Page() {
	const { isLoading, isError, error, data } =
		trpc.GetAllTasksForCurrentUser.useQuery()

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {error.message}</div>

	return (
		<div>
			<div>Tasks</div>
			{data.length ? (
				data.map((list) => (
					<div key={list.listId}>
						<div>{list.name}</div>
						<div>
							{list.tasks.map((task) => (
								<div key={task.taskId}>{task.title}</div>
							))}
						</div>
					</div>
				))
			) : (
				<div>No tasks</div>
			)}
		</div>
	)
}

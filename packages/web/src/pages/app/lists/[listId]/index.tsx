import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from '../../../../router'
import { trpc } from '../../../../util/trpc'

type DeleteTaskList = {
	listId: string
	listName: string
}

const DeleteTaskList = ({ listId, listName }: DeleteTaskList) => {
	const { mutate, isLoading } = trpc.DeleteList.useMutation()

	const navigate = useNavigate()

	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon">
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete{' '}
						<span className="font-bold">{listName}</span> and remove your data
						from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={isLoading}
						onClick={(event) => {
							event.preventDefault()
							event.stopPropagation()
							mutate(
								{ listId },
								{
									onSuccess: () => {
										setOpen(false)
										navigate('/app')
									},
								},
							)
						}}
					>
						{isLoading ? (
							<div className="flex gap-2 items-center">
								<span className="animate-spin">
									<Loader2 />
								</span>
								<span>Deleting...</span>
							</div>
						) : (
							<span>Delete</span>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

type Tasks = {
	listId: string
}

function Tasks({ listId }: Tasks) {
	const { isLoading, isError, error, data } = trpc.GetTasksForList.useQuery({
		listId,
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {error.message}</div>

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center gap-2">
				<div>Tasks</div>
				<Link
					to="/app/lists/:listId/tasks/create"
					params={{
						listId,
					}}
				>
					<Plus />
				</Link>
			</div>
			{data.length ? (
				data.map((task) => <div key={task.taskId}>{task.title}</div>)
			) : (
				<div>No tasks</div>
			)}
		</div>
	)
}

export default function Page() {
	const { listId } = useParams('/app/lists/:listId')
	const { isLoading, isError, error, data } = trpc.GetListById.useQuery({
		listId,
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error: {error.message}</div>

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center gap-8">
				<div>{data.name}</div>
				<DeleteTaskList listId={listId} listName={data.name} />
			</div>
			<Tasks listId={listId} />
		</div>
	)
}

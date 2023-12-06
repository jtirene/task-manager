import { zodResolver } from '@hookform/resolvers/zod'
import { createId } from '@paralleldrive/cuid2'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateTaskInput } from '../../../../../../../functions/src/api/routes/task/create-task/create-task-input'
import { Button } from '../../../../../components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '../../../../../components/ui/form'
import { Input } from '../../../../../components/ui/input'
import { useNavigate, useParams } from '../../../../../router'
import { trpc } from '../../../../../util/trpc'

type FormSchema = z.infer<typeof FormSchema>
const FormSchema = CreateTaskInput.omit({
	taskId: true,
	listId: true,
	// TODO make priority dynamic
	priority: true,
})

type CreateTaskForm = {
	listId: string
}

function CreateTaskForm({ listId }: CreateTaskForm) {
	const navigate = useNavigate()
	const trpcUtils = trpc.useUtils()

	const { mutate, isLoading, isError, error } = trpc.CreateTask.useMutation()

	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: '',
		},
	})

	const onSubmit = (values: FormSchema) => {
		console.log('submitting values', values)
		const taskId = createId()
		mutate(
			{
				...values,
				// TODO make priority dynamic
				priority: 'none',
				listId,
				taskId,
			},
			{
				onSuccess: () => {
					trpcUtils.GetTasksForList.invalidate()
					navigate(`/app/lists/:listId`, {
						params: {
							listId,
						},
					})
				},
			},
		)
	}

	console.log(form.formState.errors)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Task title" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<div className="flex gap-2 items-center">
							<span className="animate-spin">
								<Loader2 />
							</span>
							<span>Creating...</span>
						</div>
					) : (
						<span>Create</span>
					)}
				</Button>
			</form>
			{form.getFieldState('title').error ? (
				<div className="text-red-500">
					{form.getFieldState('title').error?.message}
				</div>
			) : null}
			{isError ? <div>Error: {error.message}</div> : null}
		</Form>
	)
}

export default function Page() {
	const { listId } = useParams('/app/lists/:listId/tasks/create')
	return (
		<div className="max-w-[800px] flex flex-col gap-8">
			<h2 className="text-xl">New Task</h2>
			<CreateTaskForm listId={listId} />
		</div>
	)
}

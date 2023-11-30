import { zodResolver } from '@hookform/resolvers/zod'
import { createId } from '@paralleldrive/cuid2'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CreateInput } from '../../../../../functions/src/api/input/list/create'
import { Button } from '../../../components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { useNavigate } from '../../../router'
import { trpc } from '../../../util/trpc'

type FormSchema = z.infer<typeof FormSchema>
const FormSchema = CreateInput.omit({
	listId: true,
})

const CreateTaskListForm = () => {
	const navigate = useNavigate()
	const trpcUtils = trpc.useUtils()

	const { mutate, isLoading } = trpc.List.Create.useMutation()

	const form = useForm<FormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = (values: FormSchema) => {
		const listId = createId()
		mutate(
			{
				...values,
				listId,
			},
			{
				onSuccess: () => {
					trpcUtils.List.GetForCurrentUser.invalidate()
					navigate(`/app/task-lists/:listId`, {
						params: {
							listId,
						},
					})
				},
			},
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name your task list" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<div className="flex gap-2 items-center">
							<span className="animate-spin">
								<Loader2 />
							</span>
							<span>Submitting...</span>
						</div>
					) : (
						<span>Submit</span>
					)}
				</Button>
			</form>
		</Form>
	)
}

export default () => {
	return (
		<div className="max-w-[800px] flex flex-col gap-8">
			<h2 className="text-xl">New Task List</h2>
			<CreateTaskListForm />
		</div>
	)
}

import { CalendarDays, ClipboardList, Home, Plus, Target } from 'lucide-react'
import { ReactNode } from 'react'
import { SignOutButton } from '../../../../components/auth/sign-out-button'
import { ThemeToggle } from '../../../../components/theme/theme-toggle'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import { MyUserAvatar } from '../../../../components/user/my-user-avatar'
import { Link } from '../../../../router'
import { trpc } from '../../../../util/trpc'

const ProfileDropdown = () => {
	const { data } = trpc.Profile.GetCurrentUserProfile.useQuery()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center gap-6 p-2 hover:bg-accent hover:cursor-pointer">
					<MyUserAvatar />
					{data ? <div className="text-xl">{data.firstName}</div> : null}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<SignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

type ScheduleListItem = {
	title: string
	icon: ReactNode
}

const ScheduleListItem = ({ title, icon }: ScheduleListItem) => {
	return (
		<div className="flex items-center gap-4 text-lg">
			{icon}
			<div>{title}</div>
		</div>
	)
}

const ScheduleList = () => {
	return (
		<div className="flex flex-col gap-6 pl-2">
			<Link to="/app/today">
				<ScheduleListItem title="My day" icon={<Target />} />
			</Link>
			<Link to="/app/this-week">
				<ScheduleListItem title="Next 7 days" icon={<CalendarDays />} />
			</Link>
			<Link to="/app/tasks">
				<ScheduleListItem title="All my tasks" icon={<ClipboardList />} />
			</Link>
		</div>
	)
}

const TaskLists = () => {
	const { data } = trpc.List.GetForCurrentUser.useQuery({ limit: 10 })
	return (
		<div className="flex flex-col gap-6 pl-2 text-lg">
			<div className="flex items-center gap-4">
				<div className="font-bold">My Lists</div>
				<Link to="/app/task-lists/create">
					<Plus />
				</Link>
			</div>
			{data?.length === 0 ? (
				<div>None</div>
			) : (
				data?.map((taskList) => (
					<Link
						to="/app/task-lists/:listId"
						params={{ listId: taskList.listId }}
						key={taskList.listId}
					>
						<div>{taskList.name}</div>
					</Link>
				))
			)}
		</div>
	)
}

export const SidebarContent = () => {
	return (
		<div className="p-6 flex flex-col justify-between h-full">
			<div className="flex flex-col gap-12">
				<ProfileDropdown />
				<Link to="/app">
					<div className="pl-2 flex items-center gap-4">
						<Home />
						Dashboard
					</div>
				</Link>
				<ScheduleList />
				<TaskLists />
			</div>
			<div>
				<ThemeToggle />
			</div>
		</div>
	)
}

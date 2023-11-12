import { SignOutButton } from '../../../../components/auth/sign-out-button'
import { ThemeToggle } from '../../../../components/theme/theme-toggle'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import { MyUserAvatar } from '../../../../components/user/my-user-avatar'

export const SidebarContent = () => {
	return (
		<div className="p-6 flex flex-col justify-between h-full">
			<div className="flex flex-col gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex items-center gap-6 p-2 hover:bg-accent hover:cursor-pointer">
							<MyUserAvatar />
							<div className="text-xl">Justin</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<SignOutButton />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div>
				<ThemeToggle />
			</div>
		</div>
	)
}

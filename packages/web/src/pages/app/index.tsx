import { SignOutButton } from '../../components/auth/sign-out-button'
import { ThemeToggle } from '../../components/theme/theme-toggle'
import { Link } from '../../router'

export default () => {
	return (
		<div className="container">
			<div className="flex flex-col">
				<div className="p-6 flex items-center justify-between">
					<div className="text-2xl font-bold tracking-tight">
						<Link to="/">
							<h1>Task Manager</h1>
						</Link>
					</div>
					<div className="flex gap-4 items-center">
						<ThemeToggle />
						<SignOutButton />
					</div>
				</div>
			</div>
			<div className="p-6">Welcome to Task Manager!</div>
		</div>
	)
}

import { useAuth, useClerk } from '@clerk/clerk-react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link, Navigate } from '../router'

export default function Page() {
	const { openSignIn } = useClerk()
	const { isLoaded, isSignedIn } = useAuth()

	if (!isLoaded) return null
	if (isSignedIn) return <Navigate to="/app" />

	return (
		<div className="container">
			<div className="flex flex-col">
				<div className="p-6 flex items-center justify-between">
					<div className="text-2xl font-bold tracking-tight">
						<Link to="/">
							<h1>Task Manager</h1>
						</Link>
					</div>
					<div>
						<Button variant="ghost" onClick={() => openSignIn({})}>
							Sign in
						</Button>{' '}
						<Button variant="secondary" onClick={() => openSignIn({})}>
							Sign up
						</Button>{' '}
					</div>
				</div>
				<div className="mt-32 flex flex-col gap-4">
					<p className="text-center text-5xl">More than task management.</p>
					<p className="text-center text-5xl text-primary">
						Unleash Your Potential.
					</p>
					<p className="text-center mt-10 text-xl">
						Seamlessly organize your life, boost productivity, and stay ahead of
						your goals.
					</p>
					<div className="flex justify-center mt-8">
						<Button
							variant="default"
							className="p-6"
							onClick={() => openSignIn({})}
						>
							<div className="flex gap-2 items-center">
								<p className="text-lg">Get Started for Free</p>
								<ArrowUpRight className="mt-1" />
							</div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc } from '../../util/trpc'

const unshuffledMessages = [
	'Organizing the tasks...',
	'Loading the gears of productivity...',
	'Herding the todo items...',
	'Guiding tasks through the maze of efficiency...',
	'Crafting the masterpiece of organized progress...',
	'Carving the path to efficiency enlightenment...',
]

const shuffledMessages = unshuffledMessages
	.map((value) => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value)

const LoadingText = () => {
	const [messageIndex, setMessageIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setMessageIndex(
				(messageIndex) => (messageIndex + 1) % shuffledMessages.length,
			)
		}, 2500)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="text-xl text-muted-foreground">
			{shuffledMessages[messageIndex]}
		</div>
	)
}

export default function Page() {
	const navigate = useNavigate()
	const { user } = useUser()
	const create = trpc.CreateProfile.useMutation()

	const [isTimeElapsed, setIsTimeElapsed] = useState(false)
	const [isReloaded, setIsReloaded] = useState(false)

	useEffect(() => {
		if (create.isIdle) {
			create.mutate(undefined, {
				onSuccess: async () => {
					await user?.reload()
					setIsReloaded(true)
				},
			})
		}

		const timeout = setTimeout(() => {
			setIsTimeElapsed(true)
		}, 5500)

		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (create.isSuccess && isTimeElapsed && isReloaded) navigate('/app')
	}, [create.isSuccess, isTimeElapsed, isReloaded])

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-4">
			<div className="text-xl">Loading Task Manager</div>
			<LoadingText />
		</div>
	)
}

import { TaskLists } from '../components/TaskLists'
import { ThemeToggle } from '../components/theme/theme-toggle'

export default function Home() {
	return (
		<>
			<h1 className="text-3xl font-bold underline">Home</h1>
			<ThemeToggle />
			<TaskLists />
		</>
	)
}

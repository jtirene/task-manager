import { Outlet } from 'react-router-dom'

export const MainContent = () => {
	return (
		<div className="p-6 pt-10">
			<Outlet />
		</div>
	)
}

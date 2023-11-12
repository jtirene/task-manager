import { useParams } from '../../../router'

export default () => {
	const { listId } = useParams('/app/task-lists/:listId')
	return <div>Task List {listId}</div>
}

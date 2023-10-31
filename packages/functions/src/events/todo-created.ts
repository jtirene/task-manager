import { Todo } from '@task-manager/core/todo'
import { EventHandler } from 'sst/node/event-bus'

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
	console.log('Todo created', evt)
})

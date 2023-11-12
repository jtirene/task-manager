// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/app`
  | `/app/task-lists/:listId`
  | `/app/task-lists/create`
  | `/app/tasks`
  | `/app/this-week`
  | `/app/today`
  | `/profile/create`

export type Params = {
  '/app/task-lists/:listId': { listId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()

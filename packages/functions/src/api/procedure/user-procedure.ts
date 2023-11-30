import { isUser } from '../middleware/is-user'
import { PublicProcedure } from './public-procedure'

export const UserProcedure = PublicProcedure.use(isUser)

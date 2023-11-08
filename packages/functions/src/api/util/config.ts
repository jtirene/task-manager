import { Config } from 'sst/node/config'

// TODO can we remove this? seems to be an issue when building
// frontend packages and importing TRPC routes
// @ts-ignore
export const CLERK_PUBLIC_KEY = Config.CLERK_PUBLIC_KEY
// @ts-ignore
export const CLERK_SECRET_KEY = Config.CLERK_SECRET_KEY

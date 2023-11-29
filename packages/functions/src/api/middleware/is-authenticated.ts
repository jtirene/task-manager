import { TRPCError } from '@trpc/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'
import { id } from '../../../../core/src/util/zod'
import { CLERK_PUBLIC_KEY } from '../config'
import { trpc } from '../trpc'

type AuthPayload = z.infer<typeof AuthPayload>
const AuthPayload = z.object({
	azp: z.string(),
	exp: z.number(),
	iat: z.number(),
	iss: z.string(),
	nbf: z.number(),
	sid: z.string(),
	sub: z.string(),
	userId: id().nullable().optional(),
})

export const isAuthenticated = trpc.middleware(async ({ ctx, next }) => {
	const token = ctx.auth.token
	if (!token) {
		console.error('missing auth token')
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Missing auth token',
		})
	}

	let rawPayload = null
	try {
		rawPayload = jwt.verify(token, CLERK_PUBLIC_KEY) as JwtPayload
	} catch (error) {
		console.error(error)
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Invalid token',
		})
	}

	const payload = AuthPayload.safeParse(rawPayload)
	if (!payload.success) {
		console.error(JSON.stringify(payload.error, null, 2))
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Invalid token payload',
		})
	}

	const now = Math.floor(Date.now() / 1000)
	if (payload.data.exp < now) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Token expired',
		})
	}

	return next({
		ctx: {
			user: {
				id: payload.data.userId,
				sub: payload.data.sub,
			},
		},
	})
})

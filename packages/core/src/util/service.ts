import { z } from 'zod'
import { validate } from './zod'

export function createServiceFunction<
	Schema extends z.ZodSchema<any, any, any>,
	Return extends any,
>(input: Schema, func: (value: z.infer<Schema>) => Return) {
	return {
		execute: validate(input, func),
		input,
	}
}

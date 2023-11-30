import { z } from 'zod'

export const id = () => z.string().cuid2()

export function validate<
	Schema extends z.ZodSchema<any, any, any>,
	Return extends any,
>(schema: Schema, func: (value: z.infer<Schema>) => Return) {
	const result = (input: z.infer<Schema>) => {
		const parsed = schema.parse(input)
		return func(parsed)
	}
	result.schema = schema
	return result
}

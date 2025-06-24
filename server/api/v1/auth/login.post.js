export default defineEventHandler(async event => {
	const body = await readBody(event)
	const config = useRuntimeConfig()
	try {
		const response = await $fetch(`${config.public.API_URL}/v1/auth/login`, {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
				'x-api-password': config.public.SECRET_KEY,
			},
		})
		return response
	} catch (error) {
		console.error('Error logging in:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to log in',
		})
	}
})

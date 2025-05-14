export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const authHeader = getHeader(event, 'authorization')

	try {
		const response = await $fetch(`${config.public.API_URL}/auth/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader,
			},
		})
		return response
	} catch (error) {
		console.error('Error auth:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to auth',
		})
	}
})

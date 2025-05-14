import { useUserStore } from '~/stores/user'

export function useAuth() {
	const userStore = useUserStore()
	const config = useRuntimeConfig()

	async function fetchUser() {
		const token = useCookie('token')
		if (!token.value || token.value.trim() === '') return

		await $fetch(`${config.public.API_URL}/v1/auth/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		})
			.then(response => {
				userStore.setUser(response)
			})
			.catch(error => {
				token.value = null
			})
	}

	return {
		fetchUser,
	}
}

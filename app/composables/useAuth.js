import { useUserStore } from '~/stores/user'

export function useAuth() {
	const userStore = useUserStore()
	const config = useRuntimeConfig()
	const token = useCookie('token')

	async function fetchUser() {
		if (!token.value || token.value.trim() === '') return

		await $fetch(`${config.public.API_URL}/v1/auth/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		})
			.then(response => {
				userStore.setUser({
					name: response.user.name,
					email: response.user.email,
					isSubscribed: response.user.isSubscribed,
				})
				token.value = response.token
			})
			.catch(error => {
				token.value = null
			})
	}

	return {
		fetchUser,
	}
}

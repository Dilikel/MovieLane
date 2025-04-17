import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		user: {
			name: '',
			email: '',
			isSubscribed: false,
		},
	}),
	actions: {
		setUser(userData) {
			this.user = userData
		},
		logout() {
			this.user = {
				name: '',
				email: '',
				isSubscribed: false,
			}
		},
	},
	getters: {
		getUser() {
			return this.user
		},
	},
})

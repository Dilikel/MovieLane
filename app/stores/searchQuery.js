import { defineStore } from 'pinia'

export const useSearchQueryStore = defineStore('searchQuery', {
	state: () => ({
		query: '',
	}),
	actions: {
		updateQuery(newQuery) {
			this.query = newQuery
		},
	},
})

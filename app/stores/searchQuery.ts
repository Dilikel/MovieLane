import { defineStore } from 'pinia';

export const useSearchQueryStore = defineStore('searchQuery', {
  state: (): { query: string } => ({
    query: '',
  }),
  actions: {
    updateQuery(newQuery: string) {
      this.query = newQuery;
    },
  },
});

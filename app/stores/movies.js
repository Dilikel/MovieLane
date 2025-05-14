export const useMoviesStore = defineStore('movies', {
	state: () => ({
		movies: [],
	}),
	actions: {
		setMovies(movies) {
			this.movies = movies
		},
	},
	getters: {
		filteredMovies: state => {
			return query => {
				if (!query) return state.movies
				return state.movies.filter(movie =>
					movie.name.toLowerCase().includes(query.toLowerCase())
				)
			}
		},
	},
})

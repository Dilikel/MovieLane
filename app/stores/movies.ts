import { defineStore } from 'pinia';
import type { Movie } from '~/types/movie';

export const useMoviesStore = defineStore('movies', {
  state: (): { movies: Movie[] } => ({
    movies: [],
  }),
  actions: {
    setMovies(movies: Movie[]) {
      this.movies = movies;
    },
  },
  getters: {
    filteredMovies: (state: { movies: Movie[] }) => {
      return (query: string) => {
        if (!query) return state.movies;
        return state.movies.filter((movie) =>
          movie.name.toLowerCase().includes(query.toLowerCase()),
        );
      };
    },
  },
});

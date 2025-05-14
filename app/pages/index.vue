<script setup>
import { useSearchQueryStore } from '~/stores/searchQuery'
import { useMoviesStore } from '~/stores/movies'

const searchQueryStore = useSearchQueryStore()
const moviesStore = useMoviesStore()
const items = computed(() => moviesStore.filteredMovies(searchQueryStore.query))
const isLoading = ref(moviesStore.movies.length === 0 ? true : false)
async function fetchItems() {
	await $fetch('/api/v1/movies')
		.then(response => {
			moviesStore.setMovies(response)
		})
		.catch(error => {
			console.log(`Ошибка при загрузке фильмов: ${error}`)
		})
		.finally(() => {
			isLoading.value = false
		})
}

onMounted(async () => {
	if (!moviesStore.movies.length) await fetchItems()
})
</script>

<template>
	<main class="main">
		<SLoader :is-loading="isLoading" />
		<SMovieCardList v-if="items.length" :items="items" />
		<SMovieEmpty v-else />
	</main>
</template>

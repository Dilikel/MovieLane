<script setup>
import { useToast } from 'vue-toastification'

const route = useRoute()
const movie = ref({})
const isLoading = ref(true)
const toast = useToast()

watchEffect(() => {
	if (movie?.value?.name) {
		useHead({
			title: `Смотреть ${movie.value.name} онлайн бесплатно в хорошем качестве`,
		})
	}
})
async function fetchMovie() {
	await $fetch(`/api/v1/movies/${route.params.id}`)
		.then(response => {
			movie.value = response
		})
		.catch(error => {
			console.error('Error fetching movie:', error)
			toast.error('Фильм не найден')
			navigateTo('/')
		})
		.finally(() => {
			isLoading.value = false
		})
}

fetchMovie()
</script>

<template>
	<main class="main">
		<SLoader :is-loading="isLoading" />
		<SMovieInfo :movie="movie" />
	</main>
</template>

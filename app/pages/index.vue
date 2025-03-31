<script setup>
import { useSearchQueryStore } from '~/stores/searchQuery'

const searchQueryStore = useSearchQueryStore()
const items = ref([])
const isLoading = ref(true)
async function fetchItems() {
	await $fetch('/api/movies', {
		params: { name: searchQueryStore.query },
	})
		.then(response => {
			items.value = response
		})
		.catch(error => {
			console.error('Error fetching movies:', error)
		})
		.finally(() => {
			isLoading.value = false
		})
}
watch(
	() => searchQueryStore.query,
	() => {
		fetchItems()
	}
)

onMounted(async () => {
	await fetchItems()
})
</script>

<template>
	<div class="min-h-screen">
		<SLoader :is-loading="isLoading" />
		<SMovieCardList :items="items" />
	</div>
</template>

<script setup>
const route = useRoute()
async function fetchMovie() {
	await $fetch(`/api/movie/${route.params.id}`)
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.error('Error fetching movie:', error)
		})
}

fetchMovie()
</script>

<template></template>

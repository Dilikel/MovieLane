<script setup>
defineProps({
	name: String,
	value: String,
})
</script>

<template>
	<div class="a-movie-item-info">{{ name }}: {{ value }}</div>
</template>

<style src="./AMovieItemInfo.scss" lang="scss" scoped />

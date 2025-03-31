<script setup>
defineProps({
	items: Array,
})
</script>

<template>
	<div class="container m-movie-card-list" v-auto-animate>
		<MMovieCard v-for="item in items" :key="item.id" v-bind="item" />
	</div>
</template>

<style src="./SMovieCardList.scss" lang="scss" scoped />

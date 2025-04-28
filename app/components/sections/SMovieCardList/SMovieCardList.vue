<script setup>
defineProps({
	items: Array,
})
</script>

<template>
	<section class="container m-movie-card-list" v-auto-animate>
		<MMovieCard v-for="item in items" :key="item.id" v-bind="item" />
	</section>
</template>

<style src="./SMovieCardList.scss" lang="scss" scoped />

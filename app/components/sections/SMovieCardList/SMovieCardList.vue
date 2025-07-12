<script setup lang="ts">
import type { Movie } from '~/types/movie'
defineProps<{
	items: Movie[]
}>()
</script>

<template>
	<section class="container m-movie-card-list" v-auto-animate>
		<MMovieCard v-for="item in items" :key="item.id" v-bind="item" />
	</section>
</template>

<style src="./SMovieCardList.scss" lang="scss" scoped />

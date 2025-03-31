<script setup>
defineProps({
	id: Number,
	imageUrl: String,
	grade: Number,
	name: String,
	genres: String,
})

const goToMovie = id => {
	navigateTo(`/movie/${id}`)
}
</script>

<template>
	<div class="m-movie-card" @click="goToMovie(id)">
		<div class="m-movie-card-image">
			<img :src="imageUrl" alt="movie" class="m-movie-card-img" />
			<div
				class="m-movie-card-cover"
				:class="{
					'm-movie-card-cover-high-grade': grade >= 7,
					'm-movie-card-cover-medium-grade': grade >= 5 && grade < 7,
					'm-movie-card-cover-low-grade': grade < 5,
				}"
			>
				{{ grade }}
			</div>
		</div>
		<div class="m-movie-card-info">
			<h2 class="m-movie-card-info-name">{{ name }}</h2>
			<p class="m-movie-card-info-genres">{{ genres }}</p>
		</div>
	</div>
</template>

<style src="./MMovieCard.scss" lang="scss" scoped />

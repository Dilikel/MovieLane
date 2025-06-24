<script setup>
const { movie } = defineProps({
	movie: Object,
})

const infoItems = computed(() => [
	{
		name: 'Название',
		value: movie?.name,
	},
	{
		name: 'Год выхода',
		value: movie?.year,
	},
	{
		name: 'Страна',
		value: movie?.country,
	},
	{
		name: 'Оригинальное название',
		value: movie?.originalName,
	},
	{
		name: 'Категории',
		value: movie?.categories,
	},
	{
		name: 'Режиссер',
		value: movie?.director,
	},
	{
		name: 'Актеры',
		value: movie?.actors,
	},
])
</script>

<template>
	<section class="s-movie-info">
		<div class="container">
			<div class="s-movie-info__left">
				<div class="s-movie-info__left-image">
					<img
						:src="movie?.imageUrl"
						alt="movie"
						class="s-movie-info__left-image-img"
					/>
					<div
						class="s-movie-info__left-image-cover"
						:class="{
							's-movie-info__left-image-cover-high-grade': movie?.grade >= 7,
							's-movie-info__left-image-cover-medium-grade':
								movie?.grade >= 5 && movie?.grade < 7,
							's-movie-info__left-image-cover-low-grade': movie?.grade < 5,
						}"
					>
						{{ movie?.grade }}
					</div>
				</div>
			</div>
			<div class="s-movie-info__right">
				<h1>Смотреть {{ movie?.name }} онлайн</h1>
				<p>{{ movie?.info }}</p>
				<div class="s-movie-info__right-info-list">
					<AMovieItemInfo
						v-for="item in infoItems"
						:key="item.name"
						v-bind="item"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style src="./SMovieInfo.scss" lang="scss" scoped />

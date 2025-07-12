<script setup lang="ts">
import type { Movie, BaseArray } from '~/types/movie'

const { movie } = defineProps<{
	movie: Movie
}>()

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
		value: movie?.countries
			?.map((country: BaseArray) => country.name)
			.join(', '),
	},
	{
		name: 'Оригинальное название',
		value: movie?.original_name,
	},
	{
		name: 'Жанры',
		value: movie?.genres?.map((genre: BaseArray) => genre.name).join(', '),
	},
	{
		name: 'Категории',
		value: movie?.categories
			?.map((category: BaseArray) => category.name)
			.join(', '),
	},
	{
		name: 'Режиссер',
		value: movie?.directors
			?.map((director: BaseArray) => director.name)
			.join(', '),
	},
	{
		name: 'Актеры',
		value: movie?.actors?.map((actor: BaseArray) => actor.name).join(', '),
	},
])
</script>

<template>
	<section class="s-movie-info">
		<div class="container">
			<div class="s-movie-info__left">
				<div class="s-movie-info__left-image">
					<img
						:src="movie?.image_url"
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

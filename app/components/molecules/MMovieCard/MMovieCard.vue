<script setup>
defineProps({
  id: Number,
  image_url: String,
  grade: Number,
  name: String,
  genres: Array,
});
</script>

<template>
  <div class="m-movie-card" @click="navigateTo(`movie/${id}`)">
    <div class="m-movie-card-image">
      <img :src="image_url" alt="movie" class="m-movie-card-img" />
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
      <p class="m-movie-card-info-genres">
        {{ genres?.map((genre) => genre.name).join(', ') }}
      </p>
    </div>
  </div>
</template>

<style src="./MMovieCard.scss" lang="scss" scoped />

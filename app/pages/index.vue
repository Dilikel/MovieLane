<script setup lang="ts">
import { useSearchQueryStore } from '~/stores/searchQuery.js';
import { useMoviesStore } from '~/stores/movies';
import type { Movie } from '~/types/movie';

useHead({
  title: 'Смотреть фильмы и сериалы онлайн в хорошем качестве на MovieLane',
});

const searchQueryStore = useSearchQueryStore();
const moviesStore = useMoviesStore();
const items = computed(() =>
  moviesStore.filteredMovies(searchQueryStore.query),
);
const isLoading = ref(moviesStore.movies.length === 0 ? true : false);
async function fetchItems() {
  await $fetch<Movie[]>('/api/v1/movies')
    .then((response) => {
      moviesStore.setMovies(response);
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке фильмов: ${error}`);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(async () => {
  if (!moviesStore.movies.length) await fetchItems();
});
</script>

<template>
  <main class="main animate__animated animate__fadeIn animate__fast">
    <SLoader :is-loading="isLoading" />
    <SMovieCardList v-if="items.length" :items="items" />
    <SMovieEmpty v-else />
  </main>
</template>

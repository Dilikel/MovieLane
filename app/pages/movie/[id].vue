<script setup lang="ts">
import { useToast } from 'vue-toastification';
import type { Movie } from '~/types/movie';

const route = useRoute();
const movie = ref<Movie>({} as Movie);
const isLoading = ref(true);
const toast = useToast();
const selectedVideoLink = ref('');
const qualityOptions = ref<{ name: string; value: string }[]>([]);

watchEffect(() => {
  if (movie?.value?.name) {
    useHead({
      title: `Смотреть ${movie.value.name} онлайн бесплатно в хорошем качестве`,
    });
  }
});
async function fetchMovie() {
  await $fetch<Movie>(`/api/v1/movies/${route.params.id}`)
    .then((response) => {
      movie.value = response;
      selectedVideoLink.value = movie.value.video_links[1080];
      qualityOptions.value = Object.entries(movie.value.video_links).map(
        ([key, value]) => ({
          name: `${key}p`,
          value,
        }),
      );
    })
    .catch((error) => {
      console.error('Error fetching movie:', error);
      toast.error('Фильм не найден');
      navigateTo('/');
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(async () => {
  await fetchMovie();
});
</script>

<template>
  <main class="main animate__animated animate__fadeIn animate__fast">
    <SLoader :is-loading="isLoading" />
    <SMovieInfo :movie="movie" />
    <SMoviePlayer
      :movie="movie"
      :video-link="selectedVideoLink"
      :quality-options="qualityOptions"
    />
  </main>
</template>

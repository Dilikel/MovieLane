<script setup>
defineProps({
  hidden: Boolean,
  isFullscreen: Boolean,
  qualityOptions: Array,
});

const emit = defineEmits(['close', 'changeSpeed']);
const newSpeed = defineModel('newSpeed', { type: Number, default: 1 });
</script>

<template>
  <div
    class="m-movie-player-settings"
    :class="{ hidden, fullscreen: isFullscreen }"
  >
    <div class="m-movie-player-settings-container">
      <Icon
        name="ci:close-lg"
        @click="emit('close')"
        class="m-movie-player-settings-close-btn"
      />

      <ul>
        <li>
          <label for="quality-select">Качество</label>
          <select id="quality-select">
            <option v-for="option in qualityOptions" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </li>
        <li>
          <label for="speed-select">Скорость воспроизведения:</label>
          <select
            id="speed-select"
            @change="(event) => emit('changeSpeed', event)"
            v-model="newSpeed"
          >
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </li>
      </ul>
    </div>
  </div>
</template>

<style src="./MMoviePlayerSettings.scss" lang="scss" scoped />

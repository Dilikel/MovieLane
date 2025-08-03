<script setup>
const emit = defineEmits(['search']);
</script>

<template>
  <div class="s-search">
    <input
      type="text"
      class="s-search-input"
      placeholder="Поиск"
      @input="emit('search', $event.target.value)"
    />
  </div>
</template>

<style src="./AInputSearch.scss" lang="scss" scoped />

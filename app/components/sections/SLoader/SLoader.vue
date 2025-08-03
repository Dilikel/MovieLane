<script setup>
defineProps({
  isLoading: Boolean,
});
</script>

<template>
  <section class="s-loader" :class="{ hidden: isLoading }">
    <div class="s-loader-spinner"></div>
  </section>
</template>

<style src="./SLoader.scss" lang="scss" scoped />

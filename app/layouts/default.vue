<script setup>
import 'animate.css';
</script>

<template>
  <div class="animate__animated animate__fadeIn animate__faster">
    <SHeader />
    <slot />
    <SFooter />
  </div>
</template>

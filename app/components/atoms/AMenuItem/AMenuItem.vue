<script setup>
defineProps({
	name: String,
	to: String,
})
</script>

<template>
	<NuxtLink class="menu-item" :to="to">
		{{ name }}
	</NuxtLink>
</template>

<style src="./AMenuItem.scss" lang="scss" scoped />

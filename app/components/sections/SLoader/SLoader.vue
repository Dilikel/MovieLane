<script setup>
defineProps({
	isLoading: Boolean,
})
</script>

<template>
	<div class="s-loader" :class="{ hidden: isLoading }">
		<div class="s-loader-spinner"></div>
	</div>
</template>

<style src="./SLoader.scss" lang="scss" scoped />

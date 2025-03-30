<script setup>
defineProps({
	name: String,
})
</script>

<template>
	<div class="menu-item">
		{{ name }}
	</div>
</template>

<style src="./AMenuItem.scss" lang="scss" scoped />

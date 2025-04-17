<script setup>
defineProps({
	name: String,
})
</script>

<template>
	<NuxtLink to="/profile" class="a-profile-button">
		<Icon
			name="material-symbols:account-circle"
			class="a-profile-button-icon"
		/>
		{{ name }}
	</NuxtLink>
</template>

<style src="./AHeaderProfileButton.scss" lang="scss" scoped />

<script setup>
defineProps({ message: String })
</script>

<template>
	<div
		class="a-auth-form-error animate__animated animate__fadeIn animate__fast"
	>
		<Icon name="tdesign:error-circle-filled" class="a-auth-form-error-icon" />
		<p>{{ message }}</p>
	</div>
</template>

<style src="./AAuthFormError.scss" lang="scss" scoped />

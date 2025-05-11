<script setup>
defineProps({
	title: String,
	text: String,
	fields: Array,
	isLoading: Boolean,
	message: String,
	linkTitle: String,
	to: String,
	linkText: String,
	buttonText: String,
})
const emit = defineEmits(['submit'])
</script>

<template>
	<section class="s-auth-form animate__animated animate__fadeIn">
		<div class="s-auth-form-content">
			<h2>{{ title }}</h2>
			<p>{{ text }}</p>
			<MAuthFormFields
				:fields="fields"
				:isLoading="isLoading"
				:buttonText="buttonText"
				@submit="formData => emit('submit', formData)"
			/>
			<MAuthAccountPrompt
				:linkTitle="linkTitle"
				:to="to"
				:linkText="linkText"
			/>
			<AAuthFormError v-if="message" :message="message" />
		</div>
	</section>
</template>

<style src="./SAuthForm.scss" lang="scss" scoped />

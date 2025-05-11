<script setup>
defineProps({
	linkTitle: String,
	to: String,
	linkText: String,
})
</script>

<template>
	<div class="m-auth-account-prompt">
		<p class="m-auth-account-prompt-text">
			{{ linkTitle }}
			<NuxtLink :to="to" class="m-auth-account-prompt-link">{{
				linkText
			}}</NuxtLink>
		</p>
	</div>
</template>

<style src="./MAuthAccountPrompt.scss" lang="scss" scoped />

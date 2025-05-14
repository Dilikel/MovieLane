<script setup>
import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/user'

definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'Профиль',
})
</script>

<template>
	<main></main>
</template>

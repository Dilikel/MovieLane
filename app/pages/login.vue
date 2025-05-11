<script setup>
const fields = [
	{
		id: 'email',
		type: 'email',
		label: 'Email',
		placeholder: 'Введите email',
	},
	{
		id: 'password',
		type: 'password',
		label: 'Пароль',
		placeholder: 'Введите пароль',
	},
]
</script>

<template>
	<main class="auth">
		<AAuthFormField v-for="field in fields" :key="field.id" v-bind="field" />
	</main>
</template>

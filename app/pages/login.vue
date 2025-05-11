<script setup>
import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/user'

definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'Вход',
})

const isLoading = ref(false)
const message = ref('')
const toast = useToast()
const userStore = useUserStore()
const token = useCookie('token', { maxAge: 60 * 60 * 24 * 30 })

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

async function loginUser(formData) {
	if (!formData.email || !formData.password) {
		toast.error('Заполните все поля!')
		return
	}

	isLoading.value = true
	message.value = ''

	await $fetch(`/api/auth/login`, {
		method: 'POST',
		body: { email: formData.email, password: formData.password },
	})
		.then(response => {
			token.value = response.token
			userStore.setUser(response.user)
			toast.success('Вы успешно вошли в аккаунт!')
			navigateTo('/')
		})
		.catch(error => {
			message.value =
				error?.response?.data?.detail || 'Ошибка. Проверьте Email и пароль.'
			toast.error(message.value)
		})
		.finally(() => {
			isLoading.value = false
		})
}
</script>

<template>
	<main class="auth">
		<SAuthForm
			title="Добро пожаловать!"
			text="Пожалуйста, войдите в свою учетную запись"
			:fields="fields"
			:isLoading="isLoading"
			:message="message"
			linkTitle="Еще нет аккаунта?"
			to="/signup"
			linkText="Зарегистрироваться"
			@submit="loginUser"
			buttonText="Войти"
		/>
	</main>
</template>

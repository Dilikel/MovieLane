<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/user'
import type { LoginResponse } from '~/types/user'

definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'Регистрация',
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
		id: 'name',
		type: 'text',
		label: 'Имя',
		placeholder: 'Введите имя',
	},
	{
		id: 'age',
		type: 'number',
		label: 'Возраст',
		placeholder: 'Введите возраст',
	},
	{
		id: 'password',
		type: 'password',
		label: 'Пароль',
		placeholder: 'Введите пароль',
	},
	{
		id: 'confirmPassword',
		type: 'password',
		label: 'Подтвердите пароль',
		placeholder: 'Введите пароль еще раз',
	},
]

interface FormData {
	email: string
	name: string
	age: number
	password: string
	confirmPassword: string
}

function validatePassword(password: string) {
	if (!/^[a-zA-Z0-9]+$/.test(password)) {
		return 'Пароль должен содержать только буквы латинского алфавита и цифры'
	}
	if (password.length < 6) {
		return 'Пароль должен содержать не менее 6 символов'
	}
	if (!/[A-Z]/.test(password)) {
		return 'Пароль должен содержать хотя бы одну заглавную букву'
	}
	if (!/[a-z]/.test(password)) {
		return 'Пароль должен содержать хотя бы одну строчную букву'
	}
	if (!/[0-9]/.test(password)) {
		return 'Пароль должен содержать хотя бы одну цифру'
	}
	return ''
}

async function registerUser(formData: FormData) {
	isLoading.value = true
	message.value = ''
	const passwordError = validatePassword(formData.password)

	if (passwordError) {
		message.value = passwordError
		toast.error(message.value)
		isLoading.value = false
		return
	}

	if (formData.password !== formData.confirmPassword) {
		message.value = 'Пароли не совпадают'
		toast.error(message.value)
		isLoading.value = false
		return
	}

	if (formData.age < 1) {
		message.value = 'Возраст должен быть больше 0'
		toast.error(message.value)
		isLoading.value = false
		return
	}

	await $fetch<LoginResponse>(`/api/v1/auth/register`, {
		method: 'POST',
		body: {
			email: formData.email,
			password: formData.password,
			name: formData.name,
			age: formData.age,
		},
	})
		.then(response => {
			token.value = response.token
			userStore.setUser({
				...response.user,
			})
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
			title="Регистрация"
			text="Создайте новую учетную запись"
			:fields="fields"
			:isLoading="isLoading"
			:message="message"
			linkTitle="Уже есть аккаунт?"
			to="/login"
			linkText="Войти"
			@submit="registerUser"
			buttonText="Зарегистрироваться"
		/>
	</main>
</template>

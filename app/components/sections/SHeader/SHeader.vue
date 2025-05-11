<script setup>
import 'hamburgers/dist/hamburgers.min.css'
import { useUserStore } from '~/stores/user'
import { useSearchQueryStore } from '~/stores/searchQuery'

const isLoading = ref(false)
const isMenuOpen = ref(false)
const token = useCookie('token')
const userStore = useUserStore()
const searchQueryStore = useSearchQueryStore()
const user = computed(() => userStore.user)
const menuItems = [
	{
		name: 'Фильмы',
	},
	{
		name: 'Сериалы',
	},
	{
		name: 'Мультфильмы',
	},
]
const mobileMenuItems = [...menuItems, { name: 'Профиль' }]

async function fetchUser() {
	isLoading.value = true
	await $fetch('/api/auth/me', {
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	})
		.then(response => {
			userStore.setUser(response.user)
		})
		.catch(error => {
			console.error('Error fetching user:', error)
		})
		.finally(() => {
			isLoading.value = false
		})
}

onMounted(async () => {
	token.value ? await fetchUser() : null
})
</script>

<template>
	<header class="s-header">
		<div class="container">
			<NuxtLink to="/" class="s-header-logo">MovieLane</NuxtLink>
			<div class="s-header-menu-list">
				<AMenuItem
					v-for="item in menuItems"
					:key="item.name"
					:name="item.name"
				/>
			</div>

			<div class="s-header-right-panel">
				<AInputSearch
					@search="newValue => searchQueryStore.updateQuery(newValue)"
				/>
				<ALoader v-if="isLoading" />
				<div v-else>
					<AHeaderLoginButton v-if="!user.value" />
					<AHeaderProfileButton v-else />
				</div>
			</div>
			<button
				class="hamburger hamburger--slider"
				:class="{ 'is-active': isMenuOpen }"
				@click="isMenuOpen = !isMenuOpen"
			>
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</button>
			<AInputSearch
				class="s-header-mobile-search"
				@search="newValue => searchQueryStore.updateQuery(newValue)"
			/>
		</div>
	</header>

	<div
		class="s-mobile-menu-overflow"
		@click="isMenuOpen = false"
		:class="{ open: isMenuOpen }"
	></div>

	<div class="s-mobile-menu" :class="{ open: isMenuOpen }">
		<div class="s-mobile-menu-header">
			<h2>Меню</h2>
			<Icon name="ci:close-lg" @click="isMenuOpen = false" />
		</div>
		<div class="s-mobile-menu-list">
			<AMenuItem
				v-for="item in mobileMenuItems"
				:key="item.name"
				:name="item.name"
			/>
		</div>
	</div>
</template>

<style src="./SHeader.scss" lang="scss" scoped />

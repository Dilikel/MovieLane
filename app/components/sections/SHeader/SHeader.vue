<script setup>
import 'hamburgers/dist/hamburgers.min.css'
const isLoading = ref(false)
const isMenuOpen = ref(false)
const isAuthenticated = ref(false)
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
				<AInputSearch />
				<ALoader v-if="isLoading" />
				<div v-else>
					<AHeaderLoginButton v-if="!isAuthenticated" />
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
			<AMobileInputSearch />
		</div>
	</header>

	<div
		class="s-mobile-menu-overflow"
		@click="isMenuOpen = false"
		:class="{ open: isMenuOpen }"
	></div>

	<div class="s-mobile-menu" v-if="isMenuOpen"></div>
</template>

<style src="./SHeader.scss" lang="scss" scoped />

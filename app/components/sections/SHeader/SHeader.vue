<script setup lang="ts">
import 'hamburgers/dist/hamburgers.min.css';
import { useUserStore } from '~/stores/user';
import { useSearchQueryStore } from '~/stores/searchQuery';
import { useAuth } from '~/composables/useAuth';

const isLoading = ref(false);
const isMenuOpen = ref(false);
const token = useCookie('token');
const userStore = useUserStore();
const searchQueryStore = useSearchQueryStore();
const user = computed(() => userStore.getUser);
const menuItems = [
  {
    name: 'Фильмы',
    to: '/movies',
  },
  {
    name: 'Сериалы',
    to: '/series',
  },
  {
    name: 'Мультфильмы',
    to: '/cartoons',
  },
];
const mobileMenuItems = [...menuItems, { name: 'Профиль', to: '/profile' }];
const { fetchUser } = useAuth();

onMounted(async () => {
  if (token.value) await fetchUser(isLoading);
});
</script>

<template>
  <header class="s-header">
    <div class="container">
      <NuxtLink to="/" class="s-header-logo">MovieLane</NuxtLink>

      <div class="s-header-menu-list">
        <AMenuItem v-for="item in menuItems" :key="item.name" v-bind="item" />
      </div>

      <div class="s-header-right-panel" v-auto-animate>
        <AInputSearch
          @search="(newValue: string) => searchQueryStore.updateQuery(newValue)"
        />
        <ALoader v-if="isLoading" />
        <div v-else>
          <AHeaderLoginButton v-if="!user.name" />
          <AHeaderProfileButton :name="user.name" v-else />
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
        @search="(newValue: string) => searchQueryStore.updateQuery(newValue)"
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
        @click="isMenuOpen = false"
        v-for="item in mobileMenuItems"
        :key="item.name"
        v-bind="item"
      />
    </div>
  </div>
</template>

<style src="./SHeader.scss" lang="scss" scoped />

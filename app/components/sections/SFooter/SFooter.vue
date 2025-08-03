<script setup>
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
];
</script>

<template>
  <footer class="s-footer">
    <div class="container">
      <div class="s-footer-logo-and-info">
        <NuxtLink to="/" class="s-footer-logo-and-info-logo"
          >MovieLane</NuxtLink
        >
        <div class="s-footer-logo-and-info-info">
          <p>
            MovieLane — ваш лучший выбор для бесплатного просмотра фильмов,
            сериалов и мультфильмов онлайн.
          </p>
          <span
            >Связаться с нами:
            <a href="mailto:movielane@yandex.ru">movielane@yandex.ru</a></span
          >
        </div>
      </div>
      <div class="s-footer-list">
        <AMenuItem
          v-for="item in menuItems"
          :key="item.name"
          :name="item.name"
        />
      </div>
    </div>
    <div class="s-footer-bottom-bar">
      <p>&copy; 2024 MovieLane. Все права защищены.</p>
    </div>
  </footer>
</template>

<style src="./SFooter.scss" lang="scss" scoped />

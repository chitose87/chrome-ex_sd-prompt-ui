<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
<!--<header>-->
  <!--  <nav>-->
  <!--    <RouterLink to="/">Home</RouterLink>-->
  <!--    <RouterLink to="/about">About</RouterLink>-->
  <!--  </nav>-->
<!--</header>-->
<main>
  <RouterView/>
</main>
</template>
<style>
#app {
  /*min-width: 300px;*/
  /*min-height: 300px;*/
  /*background: lemonchiffon;*/
}

body {
  margin: 0;
}

main {
  padding: 1rem;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/ui/Navbar.vue';
</script>

<template>
  <header class="px-12 py-4 border-b border-b-neutral-200">
    <Navbar />
  </header>
  <div class="w-[80%] mx-auto">
    <RouterView />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import Navbar from './components/ui/Navbar.vue';
</script>

<template>
  <header class="px-12 py-4 border-b border-b-neutral-200">
    <Navbar />
  </header>
  <div class="w-[80%] mx-auto">
    <RouterView />
  </div>
  <Toaster position="top-center" />
</template>

<style scoped></style>

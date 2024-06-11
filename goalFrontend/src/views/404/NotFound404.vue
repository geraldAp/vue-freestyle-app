<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] ">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
      <p class="text-gray-500 mb-6">The page you are looking for does not exist.</p>
      <router-link to="/home" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200">
        Go to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>

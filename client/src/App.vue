<script setup>
import { RouterView } from 'vue-router'
import TodoHeader from './components/TodoHeader.vue'
</script>

<template>
  <TodoHeader />
  <RouterView />
</template>

<!-- since we are using sass lang to scss  -->
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');



* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
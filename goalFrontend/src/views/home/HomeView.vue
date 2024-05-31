<script setup lang="ts">
import CreateGoal from './components/CreateGoal.vue';
import Goals from './components/Goals.vue';
</script>

<template>
  <main>
    <section class="flex justify-between items-center my-5 " id="Goals-create-goals">
      <h2 class="text-2xl font-semibold">
        Goals
      </h2>
      <CreateGoal />
    </section>
    <section id="Goals-Section">
      <Goals />
    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { goalsData } from '../home/components/goalData';
import type { GoalsType } from '@/types/types';

export default defineComponent({
  name: 'DynamicPage',
  data() {
    return {
      goal: null as GoalsType | null,
    };
  },
  created() {
    const route = useRoute();
    // Watch for route parameter changes
    watch(
      () => route.params.id,
      (newId) => {
        const foundGoal = goalsData.find((goal) => goal.id === newId);
        this.goal = foundGoal || null; // Assign null if goal not found
      },
      { immediate: true } // Immediate watch to handle initial load
    );
  },
});
</script>


<template>
  <div>
    <h1 class="text-xl font-semibold">{{ goal?.name }}</h1>
    <p>
      {{ goal?.description }}
    </p>
  </div>
</template>

<style scoped></style>

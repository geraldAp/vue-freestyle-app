<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue';
import { useAuthStore, useCompletionStore } from '@/stores/counter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import Task from './Task.vue';
import TaskCreator from './Tasks/TaskCreator.vue';
import { getTasks } from '@/utils/getters';


const authStore = useAuthStore();
const queryClient = useQueryClient();
const completionState = useCompletionStore()
const goalId = authStore.goalId;



const { data, error, isLoading, isError } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => getTasks(goalId),
  enabled: !!goalId, // Only run  if the ID exists
});

const allTasksCompleted = computed(() => data?.value?.every(task => task.completed) ?? false);
watch(
  () => data,
  (newTasks) => {
    if (newTasks) {
      completionState.setGoalCompletion(allTasksCompleted.value);
    }
  },
  { immediate: true, deep: true }
);



</script>

<template>
  <div>
    <div class="mb-6">
      <TaskCreator />
    </div>
    <ul class="flex flex-col gap-3">
      <Task v-for="(task, index) in data" :key="task._id" :task="task" />
    </ul>
  </div>
</template>

<style scoped></style>

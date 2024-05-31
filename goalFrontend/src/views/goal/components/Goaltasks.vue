<script setup lang="ts">
import { useAuthStore } from '@/stores/counter';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { geTasks } from '@/utils/getters';
import Task from './Task.vue';
import TaskCreator from './Tasks/TaskCreator.vue';
const authStore = useAuthStore()
const gaolId = authStore.goalId

const { data: tasks, isPending, isError } = useQuery({
  queryKey: ['Tasks'],
  queryFn: () => geTasks(gaolId),
})


</script>

<template>
  <div>
    <div class="mb-6">
      <TaskCreator />
    </div>
    <ul class="flex flex-col gap-3">
      <Task v-for="(task, index) in tasks" :key="task._id" :task />
    </ul>
  </div>
</template>


<style scoped></style>
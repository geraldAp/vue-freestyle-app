<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import UpdateGoal from './components/UpdateGoal.vue';
import { SquareChevronLeft, Trash2 } from 'lucide-vue-next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getGoal } from '@/utils/getters';
import { deleteGoal, updateGoal } from '@/utils/actions';
import GoalTasks from './components/Goaltasks.vue';
import { ref, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const queryClient = useQueryClient();
const goBack = () => {
  router.go(-1); // Navigate back to the previous page
};

const id = route.params.id as string;
authStore.setGoalId(id);

const { data: goal, error, isLoading, isError } = useQuery({
  queryKey: ['goal', { id: route.params.id }],
  queryFn: () => getGoal(route.params.id as string),
  enabled: !!route.params.id, // Only run the query if the ID exists
});

const isCompleted = ref(false);
watch(
  () => goal.value,
  (newGoal) => {
    if (newGoal === null || newGoal === undefined) {
      isCompleted.value = true; // Reset isCompleted to false if newGoal is null or undefined
    } else {
      isCompleted.value = newGoal.isComplete!;
    }
  },
  { immediate: true }
);
console.log('goal completion value', isCompleted.value);

const deleteMutation = useMutation({
  mutationFn: deleteGoal,
  onSuccess: () => {
    console.log('Success');
    router.push('/home');
  },
  onError: () => {
    console.error('did not work');
  },
});

const completionMutation = useMutation({
  mutationFn: updateGoal,
  onSuccess: (data) => {
    queryClient.setQueryData(['goal', { id }], data);
    console.log('Success');
  },
});

const deleteGoalHandler = () => {
  console.log('mutating delete');
  deleteMutation.mutate(route.params.id as string);
};

const markCompletion = () => {
  console.log('goal completion value 2', isCompleted.value);
  // Toggle the isCompleted value
  isCompleted.value = !isCompleted.value;
  // Send the mutation with the updated value
  completionMutation.mutate({ id, data: { isComplete: isCompleted.value } });
};
</script>

<template>
  <main class="mt-10">
    <div class="mb-5 flex justify-between items-center">
      <div @click="goBack" class="cursor-pointer">
        <SquareChevronLeft />
      </div>
      <div class="cursor-pointer" @click="deleteGoalHandler">
        <Trash2 class="text-red-500" />
      </div>
    </div>
    <section id="Heading-description" class="mb-3">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-semibold">{{ goal?.name }}</h1>
        <UpdateGoal :goal="goal" />
      </div>
      <p class="text-sm text-gray-400">
        {{ goal?.description }}
      </p>
    </section>
    <section class="my-5 h-[65vh]">
      <GoalTasks :tasks="goal?.tasks!" />
    </section>
    <div class="flex justify-end">
      <button @click="markCompletion" class="bg-neutral-100 text-neutral-600 rounded-full px-3 py-1"
        :class="{ 'hidden': isCompleted }">
        Mark as completed
      </button>
    </div>
  </main>
</template>

<style scoped></style>

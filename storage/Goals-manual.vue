<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsComponent from './GoalsComponent.vue';
import { getGoals } from '@/utils/getters'; // Ensure this utility function exists and works

const route = useRoute();
const router = useRouter();

const getStatus = (status: LocationQueryValue | LocationQueryValue[] | null | undefined): string => {
  if (Array.isArray(status)) {
    return status[0] || 'all';
  }
  return status ? String(status) : 'all';
};
// status ref 
const status = ref<string>(getStatus(route.query.status));
const limit = 10;

// defining the state 
const state = reactive({
  goals: [] as GoalsType[], // Ensure GoalsType is defined
  currentPage: 1,
  isLoading: false,
  isError: false,
  hasNextPage: true,
  errorMessage: '',
});
// fetch goal function
const fetchGoals = async (status: string, page: number) => {
  try {
    state.isLoading = true;
    const newGoals = await getGoals(status, page, limit);
    state.isLoading = false;
    return newGoals;
  } catch (error: any) {
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = error.message;
    return [];
  }
};
// load more function
const loadMore = async () => {
  if (!state.hasNextPage || state.isLoading) return;
  const newGoals = await fetchGoals(status.value, state.currentPage);
  if (newGoals.length < limit) {
    state.hasNextPage = false;
  }
  state.goals.push(...newGoals);
  state.currentPage++;
};

watch(
  () => route.query.status,
  async (newStatus) => {
    status.value = getStatus(newStatus);
    state.goals = [];
    state.currentPage = 1;
    state.hasNextPage = true;
    state.isError = false;
    const initialGoals = await fetchGoals(status.value, state.currentPage);
    state.goals = initialGoals;
    if (initialGoals.length < limit) {
      state.hasNextPage = false;
    }
    state.currentPage++;
  },
  { immediate: true }
);

const changeStatus = (newStatus: string) => {
  router.push({ name: 'home', query: { status: newStatus } });
};
</script>

<template>
    <Tabs :default-value="status" class="w-full">
      <TabsList class="w-full justify-start rounded-none bg-white mb-5">
        <TabsTrigger class="tabTrigger" value="all" @click="changeStatus('all')">All</TabsTrigger>
        <TabsTrigger class="tabTrigger" value="inProgress" @click="changeStatus('inProgress')">In Progress</TabsTrigger>
        <TabsTrigger class="tabTrigger" value="complete" @click="changeStatus('complete')">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <h2 v-if="state.isLoading">Loading...</h2>
        <p v-if="state.isError">Error: {{ state.errorMessage }}</p>
        <GoalsComponent :goals="state.goals" />
        <button @click="loadMore" v-if="!state.isLoading && state.hasNextPage">Load More</button>
        <span v-if="!state.hasNextPage">No more goals to load.</span>
      </TabsContent>
      <TabsContent value="inProgress">
        <GoalsComponent :goals="state.goals" />
        <button @click="loadMore" v-if="!state.isLoading && state.hasNextPage">Load More</button>
        <span v-if="!state.hasNextPage">No more goals to load.</span>
      </TabsContent>
      <TabsContent value="complete">
        <GoalsComponent :goals="state.goals" />
        <button @click="loadMore" v-if="!state.isLoading && state.hasNextPage">Load More</button>
        <span v-if="!state.hasNextPage">No more goals to load.</span>
      </TabsContent>
    </Tabs>
  </template>
  
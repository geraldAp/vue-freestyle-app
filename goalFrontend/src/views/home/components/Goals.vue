<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsComponent from './GoalsComponent.vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { getGoals } from '@/utils/getters';
import { ref, watch } from 'vue';
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getStatus = (status: LocationQueryValue | LocationQueryValue[] | null | undefined): string => {
  if (Array.isArray(status)) {
    return status[0] || 'all';
  }
  return status ? String(status) : 'all';
};

const status = ref<string>(getStatus(route.query.status));
const limit = ref<number>(10);

const queryKey = ref(['goals', status.value]);
const queryFn = ({ pageParam = 1 }) => getGoals(status.value, pageParam, limit.value);

const {
  data: goals,
  error,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
} = useInfiniteQuery({
  queryKey: queryKey.value,
  queryFn,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === limit.value ? allPages.length + 1 : undefined;
  },
});

watch(
  () => route.query.status,
  (newStatus) => {
    status.value = getStatus(newStatus);
    queryKey.value = ['goals', status.value]; // Update queryKey when status changes
    refetch(); // Reset the query when status changes
  },
  { immediate: true }
);

const changeStatus = (newStatus: string) => {
  router.push({ name: 'home', query: { status: newStatus } });
};

const loadMore = () => {
  fetchNextPage();
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
      <h2 v-if="isLoading">Loading...</h2>
      <div class="max-h-[70vh] pb-10 overflow-y-scroll">
        <GoalsComponent :goals="goals?.pages.flat()" />
        <button class="rounded px-2 py-2 mb-7 bg-neutral-200 " @click="loadMore" v-if="!isLoading && hasNextPage && !isFetchingNextPage">Load More</button>
        <span v-if="isLoading">Loading....</span>
        <span v-if="!hasNextPage">No more goals to load.</span>
      </div>
    </TabsContent>
    <TabsContent value="inProgress">
      <div class="max-h-[70vh] pb-10 overflow-y-scroll">

        <GoalsComponent :goals="goals?.pages.flat()" />
        <button @click="loadMore" v-if="!isLoading && hasNextPage && !isFetchingNextPage">Load More</button>
        <span v-if="!hasNextPage">No more goals to load.</span>

      </div>
    </TabsContent>
    <TabsContent value="complete">
      <div class="max-h-[70vh] pb-10 overflow-y-scroll">
        <GoalsComponent :goals="goals?.pages.flat()" />
        <button @click="loadMore" v-if="!isLoading && hasNextPage && !isFetchingNextPage">Load More</button>
        <span v-if="!hasNextPage">No more goals to load.</span>
      </div>
    </TabsContent>
  </Tabs>
</template>

<style scoped>
.overflow-y-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.overflow-y-scroll::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
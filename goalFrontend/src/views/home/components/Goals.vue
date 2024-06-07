<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoalsComponent from './GoalsComponent.vue';
import { useQuery, } from '@tanstack/vue-query';
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

const { data: goals, error, isPending, isError, refetch } = useQuery({
  queryKey: ['goals', status.value],
  queryFn: () => getGoals(status.value),
});

watch(
  () => route.query.status,
  (newStatus) => {
    status.value = getStatus(newStatus);
    refetch();
  },
  { immediate: true }
);

const changeStatus = (newStatus: string) => {
  router.push({ name: 'home', query: { status: newStatus } });
};
</script>

<template>
  <Tabs :default-value="status" class="w-full ">
        <TabsList class="w-full justify-start rounded-none bg-white  mb-5">
            <TabsTrigger class="tabTrigger " value="all" @click="changeStatus('all')">
                All
            </TabsTrigger>
            <TabsTrigger class="tabTrigger " value="inProgress" @click="changeStatus('inProgress')">
                In Progress
            </TabsTrigger>
            <TabsTrigger class="tabTrigger" value="complete"  @click="changeStatus('complete')">
                Completed
            </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
            <h2 v-if="isPending"></h2>
            <GoalsComponent :goals />
        </TabsContent>
        <TabsContent value="inProgress">
            <GoalsComponent :goals />
        </TabsContent>
        <TabsContent value="complete">
            <GoalsComponent :goals />
        </TabsContent>
    </Tabs>
</template>

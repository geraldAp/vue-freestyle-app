<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { goalsData } from './goalData';
import GoalsComponent from './GoalsComponent.vue';
import { useQuery } from '@tanstack/vue-query';
import { getGoals } from '@/utils/getters';

const { data: goals, error, isLoading, isError } = useQuery({
  queryKey: ['goals'],
  queryFn: getGoals,
});

console.log(goals)

</script>

<template>
    <Tabs default-value="all" class="w-full ">
        <TabsList class="w-full justify-start rounded-none bg-  mb-5">
            <TabsTrigger class="tabTrigger " value="all">
                All
            </TabsTrigger>
            <TabsTrigger class="tabTrigger " value="inProgress">
                In Progress
            </TabsTrigger>
            <TabsTrigger class="tabTrigger" value="complete">
                Completed
            </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
            <h2 v-if="isLoading"></h2>
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
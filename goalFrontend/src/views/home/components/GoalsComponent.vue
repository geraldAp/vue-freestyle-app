<script setup lang="ts">
import type { GoalsType } from '@/types/types';
import GoalCard from './GoalCard.vue';


interface Props {
    goals?: GoalsType[]
}
const props = defineProps<Props>()
</script>
<template>
    <GoalCard v-for="(goal, index) in props.goals" :key="goal._id" :goal />

</template>




<style scoped></style>
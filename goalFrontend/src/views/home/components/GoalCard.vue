<script setup lang="ts">
import type { GoalsType } from '@/types/types';
import { RouterLink } from "vue-router";
interface Props {
    goal: GoalsType
}
const { goal } = defineProps<Props>()


</script>
<template>
    <RouterLink :to="{ name: 'goal', params: { id: goal._id } }">
        <div class="mb-4 cursor-pointer ease-in duration-300 hover:scale-95 pb-2 border-b">
            <div class="flex gap-1 items-center text-sm text-gray-400">
                <span>Goal Description : </span>
                <p>{{ goal.miniDescription }}</p>
            </div>
            <div>
                <h3 class=" font-semibold text-lg">{{ goal.name }}</h3>
            </div>
            <div class="flex gap-2 items-center text-xs text-gray-400 ">
                <span>Priority : </span> <span>{{ goal.priority }}</span>
            </div>
        </div>
    </RouterLink>
</template>


<style scoped></style>
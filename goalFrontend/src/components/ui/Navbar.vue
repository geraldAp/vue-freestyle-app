<script setup lang="ts">
import { Hourglass,CircleUserRound } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/counter';
const authStore = useAuthStore()
</script>
<template>
    <nav class="flex w-full justify-between">
        <div class="flex justify-between items-center w-full">
            <h1 class="flex gap-2 items-center justify-center">
                <Hourglass class="size-6" /> <span class="font-semibold text-xl">Life Tracker </span>
            </h1>

            <CircleUserRound v-if="authStore.isAuthenticated" />
        </div>
        <div >

        </div>
    </nav>
</template>


<style scoped></style>
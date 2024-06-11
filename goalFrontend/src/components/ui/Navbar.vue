<script setup lang="ts">
import { Hourglass, CircleUserRound, LogOut, Settings } from 'lucide-vue-next';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useAuthStore } from '@/stores/counter';
import { logout } from '@/utils/actions';
const authStore = useAuthStore()

const logoutHandler = () => {
    logout()
    authStore.clearAuth()
}
</script>




<template>
    <nav class="flex w-full justify-between">
        <div class="flex justify-between items-center w-full">
            <h1 class="flex gap-2 items-center justify-center">
                <Hourglass class="size-6" /> <span class="font-semibold text-xl">Life Tracker </span>
            </h1>
            <div>
                <Popover class="mr-8">
                    <PopoverTrigger>
                        <CircleUserRound v-if="authStore.isAuthenticated" />
                    </PopoverTrigger>
                    <PopoverContent class="w-36 mr-8 p-2">
                        <ul class="flex flex-col gap-1">
                            <li @click="logoutHandler"
                                class="hover:bg-neutral-100 cursor-pointer duration-200 ease-in p-1 rounded font-medium text-sm flex items-center gap-3">
                                <LogOut class=" size-5 rotate-180" /> <span>Logout</span>
                            </li>
                            <li
                                class="hover:bg-neutral-100 cursor-pointer duration-200 ease-in rounded font-medium text-sm p-1 flex items-center gap-3">
                                <Settings class="size-5" /> <span>Settings</span>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </nav>
</template>


<style scoped></style>
<script setup lang="ts">
import { Hourglass, CircleUserRound, LogOut, Settings, UserCog } from 'lucide-vue-next';
import { RouterLink } from "vue-router";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useAuthStore } from '@/stores/counter';
import { logout } from '@/utils/actions';
import LogoutButton from './LogoutButton.vue';
const authStore = useAuthStore()

const logoutHandler = () => {
    logout()
    authStore.clearAuth()
}
</script>

<template>
    <nav class="flex w-full justify-between">
        <div class="flex justify-between items-center w-full">
            <RouterLink to="/home">
                <h1 class="flex gap-2 items-center justify-center">
                    <Hourglass class="size-6" /> <span class="font-semibold text-xl">Life Tracker </span>
                </h1>
            </RouterLink>
            <div v-if="authStore.isAuthenticated">
                <Popover class="mr-8">
                    <PopoverTrigger>
                        <CircleUserRound />
                    </PopoverTrigger>
                    <PopoverContent class="w-36 mr-8 p-2">
                        <ul class="flex flex-col gap-1">
                            <li class="">
                                <LogoutButton @logout-emit="logoutHandler" />
                            </li>
                            <li
                                class="hover:bg-neutral-100 cursor-pointer duration-200 ease-in rounded font-medium text-sm p-1 flex items-center gap-3">
                                <Settings class="size-5" /> <span>Settings</span>
                            </li>
                            <RouterLink :to="{ name: 'profile' }">
                                <li
                                    class="hover:bg-neutral-100 cursor-pointer duration-200 ease-in rounded font-medium text-sm p-1 flex items-center gap-3">
                                    <UserCog class="size-5" /> <span>Profile</span>
                                </li>
                            </RouterLink>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </nav>
</template>


<style scoped></style>
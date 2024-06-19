<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const emit = defineEmits([
    "logout-emit"
])

</script>
<template>
    <AlertDialog>
        <AlertDialogTrigger as-child>
            <div
                class="hover:bg-neutral-100 cursor-pointer duration-200 ease-in p-1 rounded font-medium text-sm flex items-center gap-3">
                <LogOut class=" size-5" /> <span>Logout</span>
            </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    You would have to log in again
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="$emit('logout-emit',)">Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<style scoped></style>
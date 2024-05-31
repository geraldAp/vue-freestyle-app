<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import TaskCreatorInput from './TaskCreaterInput.vue';
import { useAuthStore } from '@/stores/counter';
import { createTask } from '@/utils/actions';

const authStore = useAuthStore()
const goalId = authStore.goalId



const queryClient = useQueryClient()

const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['Tasks'] })
    },
})

const createTaskHandler = async (task: string) => {
    console.log('creating tasks ')
    mutate({ id: goalId, task})
}



</script>
<template>
    <Dialog>
        <DialogTrigger class="rounded-full text-xs bg-blue-500 shadow-md py-1 px-2 text-white ">
            Create Task
        </DialogTrigger>
        <DialogContent>
            <TaskCreatorInput  @task-creator="createTaskHandler"/>
            <DialogFooter class="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" class="w-full"> 
                        Cancel
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

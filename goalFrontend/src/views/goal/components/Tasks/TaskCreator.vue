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
import { ref } from 'vue';

const authStore = useAuthStore()
const goalId = authStore.goalId
const open = ref(false)

const queryClient = useQueryClient()

const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        closeDialogue()
    },
})

const createTaskHandler = async (task: string) => {
    console.log('creating tasks ')
    mutate({ id: goalId, task })
}

const openDialog = () => {
    console.log('opening dialog');
    setOpen(true);
};
const closeDialogue = () => {
    console.log('closing dialogue ')
    open.value = false
}
const setOpen = (value: boolean) => {
    open.value = value;
};

</script>
<template>
    <Dialog :open="open" @open-change="setOpen">
        <div @click="openDialog"
            class="rounded-full inline-flex text-xs bg-blue-500 shadow-md py-1 px-2 text-white cursor-pointer">
            Create Task
        </div>
        <DialogContent>
            <TaskCreatorInput @task-creator="createTaskHandler" @close-form="closeDialogue" />
            <DialogFooter class="sm:justify-start">
                <DialogClose asChild>
                    <Button @click="closeDialogue" type="button" variant="secondary" class="w-full">
                        Cancel
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
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
import { Button } from "@/components/ui/button";
import CreateGoalForm from './CreateGoalForm.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createGoal } from '@/utils/actions';
import type { GoalsType } from '@/types/types';
import { ref } from 'vue';
const queryClient = useQueryClient()

const open = ref(false)
const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['goals'] })
        // queryClient.invalidateQueries({ queryKey: ['reminders'] })
    },
    onError: () => {
        console.error('did not work')
    }
})


const createGoalHandler = (data: GoalsType) => {
    console.log('mutating', data)
    mutate(data)
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
        <div @click="openDialog" class="rounded-full cursor-pointer py-1 px-4 bg-neutral-100">
            Create Goal
        </div>
        <DialogContent @click="closeDialogue">
            <CreateGoalForm @goal-handler="createGoalHandler"  @close-form="closeDialogue"  />
            <DialogFooter class="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary" class="w-full" @click="closeDialogue">
                        Cancel
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
import EditGoalForm from './EditGoalForm.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateGoal } from '@/utils/actions';
import type { GoalsType } from '@/types/types';
import { useAuthStore } from '@/stores/counter';
import Button from '@/components/ui/button/Button.vue';


const { goal } = defineProps<GoalProps>();

const authStore = useAuthStore()
const queryClient = useQueryClient()
const open = ref(false)



const id = authStore.goalId

interface GoalProps {
    goal: GoalsType | null | undefined
}

const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationFn: updateGoal,
    onSuccess: (data) => {
        queryClient.setQueryData(['goal', { id }], data)
        console.log('Success')
    },
    onError: () => {
        console.error('did not work')
    }
})

const updateGoalHandler = (data: GoalsType) => {
    console.log('mutating', data)
    mutate({ id, data })
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
            Edit Goal
        </div>
        <DialogContent>
            <EditGoalForm :goal @goal-handler="updateGoalHandler" @close-form="closeDialogue" />
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

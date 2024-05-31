<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
    FormControl,

    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import type { GoalsType } from '@/types/types'
interface GoalProps {
    task: { name: string } | null | undefined
}

const props = defineProps<GoalProps>();


const emit = defineEmits([
    'task-handler', 'isEditing'
])

const formSchema = toTypedSchema(z.object({
    taskName: z.string().min(2).max(50, {
        message: "Task is required.",
    }),

}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        taskName: props?.task?.name,

    },
})

const onSubmit = handleSubmit((values) => {

    emit('task-handler', values.taskName)
    emit('isEditing')
})
</script>

<template>
    <form class="w-full space-y-6" @submit="onSubmit">
        <div class="flex gap-3 w-full">

            <FormField v-slot="{ componentField }" name="taskName">
                <FormItem>
                    <FormControl>
                        <Input type="text" class=" w-72" placeholder="Learn Coding" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit" class=" bg-blue-500 hover:bg-blue-400">
                Edit
            </Button>

        </div>
    </form>
</template>
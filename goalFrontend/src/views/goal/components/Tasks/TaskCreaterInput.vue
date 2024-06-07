<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const emit = defineEmits([
    'task-creator' , 'close-form'
])

const formSchema = toTypedSchema(z.object({
    task: z.string().min(2).max(50, {
        message: "Please provide a task"
    }),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    emit('task-creator', values.task)
    // emit('close-form')
})
</script>

<template>
    <form class="w-2/3 space-y-6" @submit="onSubmit">

        <FormField v-slot="{ componentField }" name="task" class="mb-1">
            <FormItem class="space-y-1 ">
                <FormControl>
                    <Input type="text" placeholder="Draw my time table" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class=" bg-blue-500 hover:bg-blue-600">
            Submit
        </Button>

    </form>
</template>
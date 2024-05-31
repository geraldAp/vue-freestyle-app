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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import type { GoalsType } from '@/types/types'
interface GoalProps {
    goal: GoalsType | null | undefined
}

const props = defineProps<GoalProps>();


const emit = defineEmits([
    'goal-handler', 'close-form'
])

const formSchema = toTypedSchema(z.object({
    goalName: z.string().min(2).max(50, {
        message: "Username must be at least 2 characters.",
    }),
    shortDescription: z.string().min(2).max(100),
    priority: z.string().min(2).max(100),
    description: z.string().min(2).max(100)
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        goalName: props?.goal?.name,
        shortDescription: props?.goal?.miniDescription,
        priority: props?.goal?.priority,
        description: props?.goal?.description,
    },
})

const onSubmit = handleSubmit((values) => {
    const data = {
        name: values.goalName,
        miniDescription: values.shortDescription,
        priority: values.priority,
        description: values.description
    }
    emit('goal-handler', data)
    emit('close-form')
})
</script>

<template>
    <h3 class="sm:text-2xl  ">
        Edit goal
    </h3>
    <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="goalName">
            <FormItem>
                <FormLabel>Goal name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Learn Coding" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="shortDescription">
            <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="To enable me achieve my Tech dreams " v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="priority">
            <FormItem>
                <FormLabel>Priority</FormLabel>

                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="high">
                                high
                            </SelectItem>
                            <SelectItem value="medium">
                                medium
                            </SelectItem>
                            <SelectItem value="low">
                                low
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Give a detailed description" class="resize-none" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class="w-full bg-blue-500">
            Edit
        </Button>
    </form>
</template>
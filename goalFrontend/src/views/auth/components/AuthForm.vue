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
import { toast } from '@/components/ui/toast'

interface Props {
    buttonText: string
}

const emit = defineEmits([
    'auth-handler'
])
const { buttonText } = defineProps<Props>()

const formSchema = toTypedSchema(z.object({
    email: z.string().min(2).max(50, {
        message: 'Email is required'
    }).email(),
    password: z.string().min(2).max(50, {
        message: 'Password is required'
    })
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    // toast({
    //     title: 'You submitted the following values:',
    //     description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    // })
    emit('auth-handler', values.email, values.password)

    console.log('Logged in', values)
})
</script>

<template>
    <form class=" space-y-3" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel class="text-xs">Email</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter Email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel class="text-xs">password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Enter your password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit" class="w-full rounded-full bg-blue-500 hover:bg-blue-600">
            {{ buttonText }}
        </Button>
    </form>
</template>
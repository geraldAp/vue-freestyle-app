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
    firstName: z.string().min(2).max(50, {
        message: 'Password is required'
    }),
    lastName: z.string().min(2).max(50, {
        message: 'Password is required'
    }),
    userName: z.string().min(2).max(50, {
        message: 'Password is required'
    }),
    email: z.string().min(2).max(50, {
        message: 'Email is required'
    }).email(),
    password: z.string().min(2).max(50, {
        message: 'Password is required'
    })
}))

const { handleSubmit,resetForm } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {

    emit('auth-handler', values.firstName, values.lastName, values.userName, values.email, values.password)
resetForm()
    console.log('Logged in', values)
})

</script>
<template>
    <form class=" space-y-3" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
                <FormLabel class="text-xs">First Name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter First Name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
                <FormLabel class="text-xs">Last name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter Last Name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="userName">
            <FormItem>
                <FormLabel class="text-xs">User Name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter User Name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
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
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
    'password-update'
])

const formSchema = toTypedSchema(
    z.object({
        oldPassword: z.string().min(2, { message: "Old password must be at least 2 characters long." }).max(50, { message: "Old password must be less than 50 characters." }),
        newPassword: z.string().min(2, { message: "New password must be at least 2 characters long." }).max(50, { message: "New password must be less than 50 characters." }),
        confirmPassword: z.string().min(2, { message: "Confirm password must be at least 2 characters long." }).max(50, { message: "Confirm password must be less than 50 characters." }),
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })
);



const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    emit('password-update', values.oldPassword, values.newPassword)
    resetForm()
})

</script>

<template>
    <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="oldPassword">
            <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="********" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="newPassword">
            <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="********" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="********" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit">
            Update Password
        </Button>
    </form>
</template>

<style scoped>
/* Custom styles can be added here */
</style>
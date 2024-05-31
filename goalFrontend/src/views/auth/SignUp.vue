<script setup lang="ts">
import AuthForm from './components/AuthForm.vue';
import { RouterLink } from 'vue-router';

import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import { signUpHandler } from '@/utils/actions';

const { toast } = useToast();

const router = useRouter();
const handleSignUp = async (email: string, password: string) => {
    console.log('Going there', email, password)
    const res = await signUpHandler(email, password)

    if (res) {
        toast({
            title: "Login Successful!!",
            description: 'You have logged in successfully',
        });
        router.push('/login')
    }
}


const text = 'Sign Up'
</script>
<template>
    <main class="flex justify-center">
        <div class="mt-14 w-full">
            <div class="text-center ">
                <h3 class="text-2xl font-semibold">
                    Welcome
                </h3>
                <p class="text-sm">
                    Sign up for your goal tracker account
                </p>
            </div>
            <div class="w-3/6 mx-auto">
                <AuthForm :button-text="text" @auth-handler="handleSignUp"/>
            </div>
            <div class="mt-3 text-center">
                <p class="text-xs text-blue-500">Already have an account? <span class="underline text-blue-600">
                        <RouterLink to="/login">Login</RouterLink>
                    </span></p>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
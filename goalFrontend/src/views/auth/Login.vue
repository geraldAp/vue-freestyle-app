<script setup lang="ts">
import AuthForm from './components/AuthForm.vue';
import LoginForm from './components/LoginForm.vue'
import { RouterLink } from 'vue-router';
import { loginHandler } from '@/utils/actions';
import { useRouter } from "vue-router";
import { toast } from 'vue-sonner'

const router = useRouter();
const handleLogin = async (userName: string, password: string) => {
    console.log('Going there', userName, password)
    const res = await loginHandler(userName, password)
    console.log(res)
    if (res) {
        toast.success('Login successful', {
            duration: 3000
        })
        setTimeout(() => {
            router.push('/home')
        }, 2000)
    }
}

const text = "Login"
</script>
<template>
    <main class="flex justify-center">
        <div class="mt-14 w-full">
            <div class="text-center ">
                <h3 class="text-2xl font-semibold">
                    Welcome back
                </h3>
                <p class="text-sm">
                    Log in your Goal Tracker account
                </p>
            </div>
            <div class="w-3/6 mx-auto">
                <LoginForm :button-text="text" @auth-handler="handleLogin" />
            </div>
            <div class="mt-3 text-center">
                <p class="text-xs text-blue-500">Don't have an account? <span class="underline text-blue-600">
                        <RouterLink to="/sign-up">Sign Up</RouterLink>
                    </span></p>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
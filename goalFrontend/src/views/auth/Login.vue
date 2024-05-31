<script setup lang="ts">
import AuthForm from './components/AuthForm.vue';
import { RouterLink } from 'vue-router';
import { loginHandler } from '@/utils/actions';
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

const router = useRouter();
const handleLogin = async (email: string, password: string) => {
    console.log('Going there', email, password)
    const res = await loginHandler(email, password)
    console.log(res)
    if (res) {
        toast({
            title: "Login Successful!!",
            description: 'You have logged in successfully',
        });
        router.push('/home')
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
                <AuthForm :button-text="text" @auth-handler="handleLogin" />
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
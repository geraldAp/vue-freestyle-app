<script setup lang="ts">
import { useAuthStore } from '@/stores/counter';
import UpdatePasswordForm from './components/UpdatePassword.vue'
import { updatePassword } from '@/utils/actions';
import { toast } from 'vue-sonner'
import { useRouter } from "vue-router";
const { userInfo } = useAuthStore()

const router = useRouter();
const changePassword = async (oldPassword: string, newPassword: string) => {
  const data = { email: userInfo.email, oldPassword, newPassword };
  const { success, res, error } = await updatePassword(data);

  if (success) {
    console.log('Password update success:', res);
    if (res && (res.status === 200 || res.status === 201)) {
      toast.success('Password updated successfully', {
        duration: 2000
      });
      // Optionally navigate to another route or perform additional actions
    } else {
      console.error('Unexpected success response:', res);
      toast.error('Unexpected response received', {
        duration: 2000
      });
    }
  } else {
    console.error('Password update failed:', error);
    toast.error(`Password update failed: ${error}`, {
      duration: 2000
    });
  }
};
</script>


<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
    <h2 class="text-2xl font-bold mb-6">Profile Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div class="mb-2 bg-white shadow-sm rounded-lg p-3">
        <span for="username" class="block text-sm font-medium text-gray-400">First Name</span>
        <p class="font-semibold">
          {{ userInfo.firstName }}
        </p>
      </div>
      <div class="mb-2 bg-white shadow-sm rounded-lg p-3">
        <span for="username" class="block text-sm font-medium text-gray-400">Last Name</span>
        <p class="font-semibold">
          {{ userInfo.lastName }}
        </p>
      </div>
    </div>
    <div class="mb-2 bg-white shadow-sm rounded-lg p-3">
      <span for="username" class="block text-sm font-medium text-gray-400">Username</span>
      <p class="font-semibold">
        {{ userInfo.userName }}
      </p>
    </div>
    <div class="mb-2 bg-white shadow-sm rounded-lg p-3">
      <span class="block text-sm font-medium text-gray-400">Email Address</span>
      <p class="font-semibold">
        {{ userInfo.email }}
      </p>
    </div>

    <h3 class="text-xl font-bold mt-8 mb-4">Update Password</h3>
    <section id="UpdatePasswordForm">
      <UpdatePasswordForm @password-update="changePassword" />
    </section>
  </div>
</template>

<!-- <style scoped>
/* Custom styles can be added here */
</style> -->

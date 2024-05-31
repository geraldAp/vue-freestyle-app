<script setup lang="ts">
import { ref, watch } from 'vue';
import { CircleCheck, Pencil, Trash2 } from 'lucide-vue-next';
import EditTaskForm from './EditTaskForm.vue';
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '@/stores/counter';
import { editTask, deleteTask } from '@/utils/actions';

interface Props {
    task: {
        name: string;
        _id: string;
        completed: boolean;
    };
}

const props = defineProps<Props>();

const complete = ref(props.task.completed);
const isEditing = ref(false);
const authStore = useAuthStore();
const queryClient = useQueryClient();
const goalId = authStore.goalId;

interface TaskType {
    _id: string;
    name: string;
    completed: boolean;
}

const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: (data) => {
        queryClient.setQueryData(['Tasks', goalId], (oldData: TaskType[]) => {
            if (!oldData) return [];
            return oldData.map(task => task._id === props.task._id ? data : task);
        });
        console.log('Success');
    },
    onError: () => {
        console.error('did not edit');
    },
});

const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ['Tasks'] });
    },
    onError: () => {
        console.error('did not delete');
    },
});

const editTaskHandler = (task: string) => {
    editMutation.mutate({ goalId, task:{name:task}, taskId: props.task._id });
};

const deleteTaskHandler = () => {
    deleteMutation.mutate({ goalId, taskId: props.task._id });
};

const setIsEditing = () => {
    isEditing.value = !isEditing.value;
};

const setCompleted = () => {
    complete.value = !complete.value;
    // Optionally, you can call an API to persist this change
    editMutation.mutate({ goalId, task: { ...props.task, completed: complete.value }, taskId: props.task._id });
};

// Watch for changes in props.task.completed to update the complete ref
watch(
    () => props.task.completed,
    (newVal) => {
        complete.value = newVal;
    }
);

</script>

<template>
    <div v-if="isEditing">
        <li>
            <EditTaskForm :task="props.task" @task-handler="editTaskHandler" @isEditing="setIsEditing" />
        </li>
    </div>
    <div v-else>
        <li class="flex items-center justify-between rounded-md bg-[#f1f1f1] shadow-sm px-4 py-3 group">
            <div>
                <span :class="{ 'text-blue-500 line-through': complete }">{{ props.task.name }}</span>
            </div>
            <div class="flex gap-2 items opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 duration-300">
                <CircleCheck @click="setCompleted"  :class="{ 'text-blue-500': complete }" />
                <Pencil @click="setIsEditing" class="text-blue-500" />
                <Trash2 @click="deleteTaskHandler" class="text-red-500" />
            </div>
        </li>
    </div>
</template>

<style scoped></style>

<script setup>
import { Icon } from '@iconify/vue';
const props = defineProps({
    todo: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['toggle-complete', 'edit-todo', 'update-todo', 'delete-todo'])
const toggleTodoEdit = () => {
    emit('edit-todo', props.index)
}

</script>
<template>
    <li>
        <!-- inline emit  -->
        <input type="checkbox" :checked="todo.isCompleted" @input="$emit('toggle-complete', index)">
        <div class="todo">
            <input v-if="todo.isEditing" type="text" :value="todo.todo"
                @input="$emit('update-todo', $event.target.value, index)" />
            <span v-else :class="{ 'completed-todo': todo.isCompleted }">
                {{ todo.todo }}
            </span>
        </div>
        <div class="todo-actions">
            <Icon @click="toggleTodoEdit()" v-if="todo.isEditing" icon="ph:check-circle" color="#41b080" class="icon"
                width="22" />
            <Icon @click="toggleTodoEdit()" v-else icon="ph:pencil-fill" color="#41b080" class="icon" width="22" />
            <Icon icon="ph:trash" @click="$emit('delete-todo', todo.id)" class="icon" color="#f95e5e" width="22" />
        </div>
    </li>
</template>


<style lang="scss" scoped>
li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 10px;
    background-color: #f1f1f1;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);

    &:hover {
        .todo-actions {
            opacity: 1;
        }
    }

    .completed-todo {
        text-decoration: line-through;
    }

    input[type="checkbox"] {
        appearance: none;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

        &:checked {
            background-color: #41b080;
        }
    }

    .todo {
        flex: 1;

        input[type="text"] {
            width: 100%;
            padding: 2px 6px;
            border: 2px solid #41b080;
        }
    }

    .todo-actions {
        display: flex;
        gap: 6px;
        opacity: 0;
        transition: 150ms ease-in-out;

        .icon {
            cursor: pointer;
        }
    }

}
</style>

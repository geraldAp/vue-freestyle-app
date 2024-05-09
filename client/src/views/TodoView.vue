<script setup>
import TodoCreator from "@/components/TodoCreator.vue";
import TodoItem from "@/components/TodoItem.vue";
import { Icon } from "@iconify/vue";
import { uid } from 'uid'
import { onMounted, ref, watch, computed } from "vue";

// to store our todo items 
const todoList = ref([

])



watch(todoList, () => {
  SetTodoList()
}, { deep: true }) //

const todoCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted)
})



const fetchTodoList = () => {
  const todos = JSON.parse(localStorage.getItem('todoList'))
  if (todos) {
    todoList.value = todos
  }
}
// no need for use effect runs everytime component mounts 
onMounted(() => {
  fetchTodoList()
})

const SetTodoList = () => {
  const stringedTodos = JSON.stringify(todoList.value);
  localStorage.setItem('todoList', stringedTodos);
};



const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: null,
    isEditing: null

  })

}
const toggleTodoComplete = (todoPos) => {
  console.log(todoPos)
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted

}

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing

}

const updateTodo = (todo, todoPos) => {
  todoList.value[todoPos].todo = todo


}

const deleteTodo = (todoId) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== todoId)

}
</script>

<template>
  <main>
    <h1>
      Create Todo
    </h1>
    <!-- here we don't need to add the () for the function -->
    <TodoCreator @create-todo="createTodo" />
    <ul v-if="todoList.length > 0" class="todo-list">
      <TodoItem v-for="(todo, index ) in todoList" :key="todo.id" :todo="todo" :index="index"
        @toggle-complete="toggleTodoComplete" @edit-todo="toggleEditTodo" @update-todo="updateTodo"
        @delete-todo="deleteTodo" />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="noto-vl:sad-but-relieved-face" width="22" />
      <span>
        You have no todo&apos;s to complete! Add one!
      </span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
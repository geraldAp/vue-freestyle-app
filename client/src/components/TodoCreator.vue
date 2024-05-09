<script setup>
// making our app reactive 
import { reactive, ref } from "vue"
import TodButton from "./TodButton.vue";
// to emit whats done here to the place this component is being used 
const emit = defineEmits([
    'create-todo'
])

// for validation it will also be best to use the reactive method 
const todoState = reactive({
    todo: '',
    invalid: null,
    errMsg: ""
})

const createTodo = () => {
    console.log('creating process')
    todoState.invalid = null
    // sending the todo value with emit 
    if (todoState.todo) {
        emit('create-todo', todoState.todo)
        todoState.todo = ""
        return
    } else {
        todoState.invalid = true
        todoState.errMsg = "Todo value cannot be empty"
    }
}


// making it reactive using the reactive method 
// const todoState = reactive({
//     todo: 'testing reactive '
// })

</script>





<template>
    <!-- style binding  -->
    <div class="input-wrap" :class="{ 'input-err': todoState.invalid }">
        <!-- so the v-model directive takes the todo value in the script and syncs it up to the input -->
        <!-- <input type="text" v-model="todo"> ref way -->
        <input type="text" v-model="todoState.todo">
        <!-- because we are using slot not needed in this instant but for reusable components yes  -->
        <TodButton @click="createTodo()">
        Create
        </TodButton>
    </div>
    <p v-show="todoState.invalid" class="err-msg">
        {{ todoState.errMsg }}
    </p>
</template>


<style lang="scss" scoped>
.input-wrap {
    display: flex;
    transition: 250ms ease;
    border: 2px solid #41b080;

    &.input-err {
        border-color: red;
    }

    &:focus-within {
        box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
            0 -2px 4px -2px rgb(0 0 0 / 0.1);
    }

    input {
        width: 100%;
        padding: 8px 6px;
        border: none;

        &:focus {
            outline: none;
        }
    }


}

.err-msg {
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    color: red;
}
</style>
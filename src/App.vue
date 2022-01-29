<script setup>
import { ref } from "vue";
import TodoItem from "./components/TodoItem.vue";
import TodoForm from "./components/TodoForm.vue";

const todoItems = ref([]);

const addTodo = (todoItem) => {
  todoItems.value.push({
    label: todoItem,
    isCompleted: false,
  });
};
</script>

<template>
  <TodoForm @todo-added="addTodo"></TodoForm>
  <div v-for="(todo, idx) in todoItems" :key="idx">
    <TodoItem :label="todo.label" :is-completed="todo.isCompleted"></TodoItem>
  </div>
</template>

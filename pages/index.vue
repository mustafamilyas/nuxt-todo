<script setup lang="ts">
import { TodoQuery } from "~/constants/query";

const route = useRoute();

const currentDateString = dateToReadable(new Date());

const todoStore = useTodoListStore();

const activeTodoId = computed(
  () => route.query[TodoQuery.currentQuestion] as string
);
const activeTodo = computed(() => {
  return todoStore.todos.find((todo) => todo.id === activeTodoId.value);
});

const updateToggle = (id: string) => {
  todoStore.toggleTodo(id);
};
</script>

<template>
  <main :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.header">
        <h1 :class="$style.title">My Task</h1>
        <p :class="$style.date">{{ currentDateString }}</p>
      </div>
      <div :class="$style.todos">
        <NewTodoInput @submit="todoStore.addTodo" />
        <TodoItem
          v-for="todo in todoStore.activeTodos"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :completed="todo.completed"
          :active="todo.id === activeTodoId"
          @toggle="updateToggle"
        />
        <TodoItem
          v-for="todo in todoStore.completedTodos"
          :key="todo.id"
          :id="todo.id"
          :title="todo.title"
          :completed="todo.completed"
          :active="todo.id === activeTodoId"
          @toggle="updateToggle"
        />
      </div>
    </div>
    <TodoDetail v-if="activeTodo" :todo="activeTodo" />
  </main>
</template>

<style module>
.container {
  margin: 2.4rem;
  position: relative;
  display: flex;
  gap: 2.4rem;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
}

.title {
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 2.8rem;
}

.date {
  font-size: 1.6rem;
  color: #666;
}

.todos {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  margin-top: 3.6rem;
}
</style>

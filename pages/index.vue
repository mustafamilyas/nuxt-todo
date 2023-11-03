<script setup lang="ts">
const currentDateString = dateToReadable(new Date());
const dummyTodos = new Array(5).fill(null).map((_, i) => ({
  id: i,
  title: `Todo ${i + 1}`,
  completed: false,
}));
</script>

<template>
  <main :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">My Task</h1>
      <p :class="$style.date">{{ currentDateString }}</p>
    </div>
    <div :class="$style.todo">
      <NewTodoInput />
      <TodoItem v-for="todo in dummyTodos" :key="todo.id" :todo="todo" />
    </div>
  </main>
</template>

<style module>
.container {
  margin: 2.4rem 7.2rem;
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
</style>

<script setup lang="ts">
const activeTodoId = ref<string | null>(null);
const currentDateString = dateToReadable(new Date());
const dummyTodos = new Array(5).fill(null).map((_, i) => ({
  id: i.toString(),
  title: `Todo ${i + 1}`,
  completed: false,
}));

const changeActiveTodo = (id: string) => {
  activeTodoId.value = id;
};
</script>

<template>
  <main :class="$style.container">
    <div :class="$style.header">
      <h1 :class="$style.title">My Task</h1>
      <p :class="$style.date">{{ currentDateString }}</p>
    </div>
    <div :class="$style.todos">
      <NewTodoInput />
      <TodoItem
        v-for="todo in dummyTodos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :active="todo.id === activeTodoId"
        @click="changeActiveTodo"
      />
    </div>
  </main>
</template>

<style module>
.container {
  margin: 2.4rem;
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

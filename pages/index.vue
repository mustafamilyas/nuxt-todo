<script setup lang="ts">
const activeTodoId = ref<string | null>(null);
const currentDateString = dateToReadable(new Date());

const todoStore = useTodoListStore();

const changeActiveTodo = (id: string) => {
  activeTodoId.value = id;
};

const updateToggle = ({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) => {
  todoStore.toggleTodo(id);
  activeTodoId.value = null;
};
</script>

<template>
  <main :class="$style.container">
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
        @click="changeActiveTodo"
        @toggle="updateToggle"
      />
      <TodoItem
        v-for="todo in todoStore.completedTodos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :completed="todo.completed"
        :active="todo.id === activeTodoId"
        @click="changeActiveTodo"
        @toggle="updateToggle"
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

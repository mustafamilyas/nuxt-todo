<script setup lang="ts">
import { TodoQuery } from "~/constants/query";

const route = useRoute();
const router = useRouter();

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

const updateTodo = (todo: Todo) => {
  todoStore.updateTodo(todo);
};

const removeActiveQuery = () => {
  const query = { ...route.query };
  delete query[TodoQuery.currentQuestion];
  router.replace({ query });
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
    <TodoDetail
      v-if="activeTodo"
      :todo="activeTodo"
      @update="updateTodo"
      @close="removeActiveQuery"
      @delete="todoStore.removeTodo"
    />
  </main>
</template>

<style module>
.container {
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 2.4rem;
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

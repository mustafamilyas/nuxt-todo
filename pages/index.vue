<script setup lang="ts">
import { TodoQuery } from "~/constants/query";

const route = useRoute();
const router = useRouter();
const todoStore = useTodoListStore();

const { refresh } = await useFetch("/api/todos", {
  onResponse({ request, response, options }) {
    // Process the response data
    todoStore.syncTodos(response._data);
  },
});

const currentDateString = dateToReadable(new Date());

const activeTodoId = computed(
  () => route.query[TodoQuery.currentQuestion] as string
);
const activeTodo = computed(() => {
  return todoStore.todos.find((todo) => todo.id === activeTodoId.value);
});

const updateToggle = (id: string) => {
  todoStore.toggleTodo(id);
};

const updateTodo = async ({ id, ...updateBody }: Todo) => {
  todoStore.updateTodo({
    ...updateBody,
    id: id,
  });
  try {
    await $fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBody),
    });
  } catch (error) {
    console.error("Error updating todo", error);
  }
};

const removeActiveQuery = () => {
  const query = { ...route.query };
  delete query[TodoQuery.currentQuestion];
  router.replace({ query });
  refresh();
};

const addTodo = async (title: string) => {
  const newTodo = todoStore.addTodo(title);
  try {
    const response = await $fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    todoStore.syncTodoId(newTodo.id, response.id);
  } catch (error) {
    todoStore.removeTodo(newTodo.id);
  }
};

const removeTodo = async (id: string) => {
  const removedTodo = todoStore.removeTodo(id);
  try {
    const response = await $fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (!removedTodo) return;
    todoStore.addTodoComplete(removedTodo);
  }
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
        <NewTodoInput @submit="addTodo" />
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
      @delete="removeTodo"
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
  padding: 0 2.4rem 2.4rem 2.4rem;
  overflow: auto;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f3f2f1;
  padding: 2.4rem 0 3.6rem 0;
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
  overflow: auto;
  gap: 0.8rem;
  padding: 0.2rem;
}
</style>

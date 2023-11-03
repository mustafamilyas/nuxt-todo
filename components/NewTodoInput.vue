<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", todo: string): void;
}>();
const newTodo = ref("");

const addTodo = (event: Event) => {
  event.preventDefault();
  emit("submit", newTodo.value);
};
</script>

<template>
  <form @submit="addTodo">
    <input type="text" v-model="newTodo" />
    <button>Add</button>
  </form>
</template>

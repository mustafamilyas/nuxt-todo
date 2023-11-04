<script setup lang="ts">
import type { Todo } from "~/composables/useTodoListStore";
import { isTodo } from "~/utils/is-todo";
const props = defineProps({
  className: {
    type: String,
    required: false,
  },
  todo: {
    type: Object as PropType<Todo>,
    required: true,
    validator: isTodo,
  },
});

const emit = defineEmits<{
  (e: "update", todo: Todo): void;
}>();

const handleToggle = (event: Event) => {
  event.stopPropagation();
  emit("update", {
    ...props.todo,
    completed: !props.todo.completed,
  });
};

const handleUpdateTitle = (event: Event) => {
  event.stopPropagation();
  emit("update", {
    ...props.todo,
    title: (event.target as HTMLInputElement).value,
  });
};

const handleUpdateDescription = (event: Event) => {
  event.stopPropagation();
  emit("update", {
    ...props.todo,
    description: (event.target as HTMLInputElement).value,
  });
};
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.mainForm">
      <div :class="[$style.item, $style.title]">
        <Checkbox :checked="props.todo.completed" @change="handleToggle" />
        <input
          type="text"
          :value="props.todo.title"
          @change="handleUpdateTitle"
        />
        <svgo-star :class="$style.icon" height="24" width="24" />
      </div>
      <div :class="[$style.item]">
        <textarea
          :value="props.todo.description"
          @change="handleUpdateDescription"
          placeholder="Add note"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
}

.mainForm {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: #000;
}
</style>

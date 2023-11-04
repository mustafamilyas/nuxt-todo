<script setup lang="ts">
import { TodoQuery } from "~/constants/query";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  active: Boolean,
});

const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();

const handleToggle = (event: Event) => {
  event.stopPropagation();
  emit("toggle", props.id);
};
</script>

<template>
  <div
    :class="[
      $style.container,
      props.active && $style.active,
      props.completed && $style.completed,
    ]"
  >
    <Checkbox
      :checked="props.completed"
      @change="handleToggle"
      data-test="todo-item-checkbox"
    />
    <NuxtLink
      :class="$style.label"
      :to="`?${TodoQuery.currentQuestion}=${props.id}`"
      data-test="todo-item-link"
    >
      <span :class="$style.title" data-test="todo-item-title">
        {{ title }}
      </span>
      <span :class="$style.type">Tasks</span>
    </NuxtLink>
    <svgo-star :class="$style.icon" height="24" width="24" />
  </div>
</template>

<style module>
.container {
  background-color: #fff;
  box-shadow: 0rem 0.03rem 0.09rem rgba(0, 0, 0, 0.1),
    0rem 0.16rem 0.36rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  padding: 0 1.4rem;

  display: flex;
  align-items: center;
  position: relative;
  min-height: 5.02rem;
  word-wrap: break-word;
  word-break: break-word;
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  gap: 0.8rem;
}

.container:hover {
  background-color: var(--col-secondary-light, #f5f5f5);
}

.container.active {
  background-color: var(--col-primary-light, #ecf6fd);
}

.label {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.4rem 0;
  gap: 0.2rem;
  flex-grow: 1;
  text-decoration: none;
}

.title {
  font-size: 1.4rem;
  color: #323130;
  line-height: 2rem;
}

.completed .title {
  text-decoration: line-through;
  color: var(--col-secondary, #797775);
}

.type {
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: var(--col-secondary, #797775);
}

.icon {
  height: 2.4rem;
  width: 2.4rem;
  color: var(--col-secondary, #797775);
  cursor: not-allowed;
}
</style>

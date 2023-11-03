<script setup lang="ts">
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
  (e: "click", id: string): void;
  (e: "toggle", id: string): void;
}>();

function handleClick() {
  emit("click", props.id);
}
</script>

<template>
  <div
    :class="[$style.container, props.active && $style.active]"
    @click="handleClick"
  >
    <div :class="$style.checkbox">
      <input type="checkbox" :id="id" :checked="completed" />
    </div>

    <label :class="$style.label" :for="id">
      <span :class="$style.title">
        {{ title }}
      </span>
      <span :class="$style.task"> Task </span>
    </label>
  </div>
</template>

<style module>
.container {
  background-color: #fff;
  box-shadow: 0rem 0.03rem 0.09rem rgba(0, 0, 0, 0.1),
    0rem 0.16rem 0.36rem rgba(0, 0, 0, 0.1);
  border-radius: 0.04rem;
  padding: 0rem 1.06rem;
  min-height: 5.02rem;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.container:hover {
  background-color: #f5f5f5;
}

.container.active {
  background-color: #ecf6fd;
}
</style>

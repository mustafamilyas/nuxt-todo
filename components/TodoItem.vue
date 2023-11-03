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
  (
    e: "toggle",
    {
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }
  ): void;
}>();

const handleClick = () => {
  emit("click", props.id);
};

const handleToggle = (event: Event) => {
  event.stopPropagation();
  emit("toggle", {
    id: props.id,
    completed: !props.completed,
  });
};
</script>

<template>
  <div
    :class="[
      $style.container,
      props.active && $style.active,
      props.completed && $style.completed,
    ]"
    @click="handleClick"
  >
    <div :class="$style.checkbox">
      <Checkbox
        :id="props.id"
        :checked="props.completed"
        @change="handleToggle"
      />
    </div>

    <label :class="$style.label" :for="props.id">
      <span :class="$style.title">
        {{ title }}
      </span>
      <span :class="$style.type">Tasks</span>
    </label>
    <svgo-star :class="$style.icon" />
  </div>
</template>

<style module>
.container {
  background-color: #fff;
  box-shadow: 0rem 0.03rem 0.09rem rgba(0, 0, 0, 0.1),
    0rem 0.16rem 0.36rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  padding: 1.4rem;

  min-height: 5.02rem;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  flex-wrap: wrap;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  gap: 0.8rem;
}

.container:hover {
  background-color: #f5f5f5;
}

.container.active {
  background-color: #ecf6fd;
}

.label {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.2rem;
  flex-grow: 1;
}

.title {
  font-size: 1.4rem;
  color: #323130;
  line-height: 2rem;
}

.completed .title {
  text-decoration: line-through;
  color: #797775;
}

.type {
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #797775;
}

.icon {
  height: 2.4rem;
  width: 2.4rem;
  color: #797775;
  cursor: not-allowed;
}
</style>

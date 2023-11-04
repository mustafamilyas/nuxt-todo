<script setup lang="ts">
import type { Todo } from "~/composables/useTodoListStore";

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

const isTitleFocused = ref(false);

const emit = defineEmits<{
  (e: "update", todo: Todo): void;
  (e: "close"): void;
  (e: "delete", id: string): void;
}>();

const handleFocus = () => {
  isTitleFocused.value = true;
};

const handleBlur = () => {
  isTitleFocused.value = false;
};
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

const triggerClose = () => {
  emit("close");
};

const handleDelete = (event: Event) => {
  event.stopPropagation();
  emit("delete", props.todo.id);
};
</script>

<template>
  <div :class="$style.backdrop" @click="triggerClose"></div>
  <div :class="$style.container">
    <div :class="$style.mainForm">
      <div :class="[$style.item, $style.title]">
        <Checkbox :checked="props.todo.completed" @change="handleToggle" />
        <input
          v-if="isTitleFocused"
          type="text"
          :value="props.todo.title"
          @change="handleUpdateTitle"
          @blur="handleBlur"
        />
        <span v-else @click="handleFocus">{{ props.todo.title }}</span>
        <svgo-star :class="$style.icon" height="24" width="24" />
      </div>
      <div :class="[$style.item, $style.note]">
        <textarea
          :value="props.todo.description"
          @change="handleUpdateDescription"
          placeholder="Add note"
        >
        </textarea>
      </div>
    </div>
    <div :class="$style.actions">
      <button :class="$style.iconWrapper" @click="triggerClose">
        <SvgoClose :class="$style.icon" height="24" width="24" />
      </button>
      <span :class="$style.date">{{
        dateToReadableFull(new Date(todo?.createdAt || ""))
      }}</span>
      <button :class="$style.iconWrapper" @click="handleDelete">
        <SvgoDelete :class="$style.icon" height="24" width="24" />
      </button>
    </div>
  </div>
</template>

<style module>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: none;
}

@media screen and (max-width: 1000px) {
  .backdrop {
    display: block;
  }
}
.container {
  background: #f3f2f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  max-width: 36rem;
  box-shadow: 0rem 0.12rem 0.36rem rgba(0, 0, 0, 0.1),
    0rem 0.64rem 1.44rem rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 400px) {
  .container {
    width: 100%;
    max-width: unset;
  }
}

@media screen and (max-width: 1000px) {
  .container {
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 200;
  }
}

.mainForm {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2.4rem;
}

.item {
  background-color: white;
  border-radius: 0.4rem;
}

.title {
  display: flex;
  align-items: center;
  min-height: 5.02rem;
  word-wrap: break-word;
  word-break: break-word;
  gap: 0.8rem;
  padding: 0 1.4rem;
}

.title input {
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: #4a4a4a;
  flex: 1;
}

.title > span {
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
  color: #4a4a4a;
  flex: 1;
  padding: 1.4rem;
}

.title input::placeholder {
  color: #c7c7c7;
}

.title input:focus {
  outline: none;
}

.title .icon {
  height: 2.4rem;
  width: 2.4rem;
  color: var(--col-secondary, #797775);
  cursor: not-allowed;
}

.note {
  padding: 1.4rem;
}

.note textarea {
  border: none;
  font-size: 1.4rem;
  font-weight: 300;
  font-family: inherit;
  color: #4a4a4a;
  resize: none;
  width: 100%;
  height: 100%;
  outline: none;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1.6rem;
  border-top: 1px solid #e0e0e0;
}

.actions .icon {
  height: 2.4rem;
  width: 2.4rem;
  color: var(--col-secondary, #797775);
}

.actions .iconWrapper {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.date {
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.8rem;
  color: #4a4a4a;
}
</style>

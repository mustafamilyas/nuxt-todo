<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", todo: string): void;
}>();

const newTodo = ref("");
const isFocused = ref(false);

const addTodo = (event: Event) => {
  event.preventDefault();
  emit("submit", newTodo.value);
  newTodo.value = "";
};

const focusInput = () => {
  isFocused.value = true;
};

const blurInput = () => {
  isFocused.value = false;
};
</script>

<template>
  <form
    @submit="addTodo"
    :class="{
      [$style.container]: true,
      [$style.active]: newTodo || isFocused,
    }"
  >
    <div :class="$style.mainContent">
      <svgo-add :class="$style.icon" />
      <input
        ref="input"
        type="text"
        v-model="newTodo"
        :class="$style.input"
        placeholder="Add a Task"
        @focus="focusInput"
        @blur="blurInput"
      />
    </div>
    <div :class="$style.actions">
      <div :class="$style.options">
        <button type="button" :class="$style.iconWrapper">
          <SvgoCalendar :class="$style.icon" />
        </button>
        <button type="button" :class="$style.iconWrapper">
          <SvgoNotifications :class="$style.icon" />
        </button>
        <button type="button" :class="$style.iconWrapper">
          <SvgoRepeat :class="$style.icon" />
        </button>
      </div>
      <button :class="$style.submit">Add</button>
    </div>
  </form>
</template>

<style module>
.container {
  background-color: #fff;
  box-shadow: 0rem 0.03rem 0.09rem rgba(0, 0, 0, 0.1),
    0rem 0.16rem 0.36rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  transition: all 0.2s ease-in-out;
}

.container.active {
  outline: 1px solid var(--col-primary, #2564cf);
}

.actions {
  max-height: 0;
  overflow: hidden;
  width: 100%;
  padding: 0 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  transition: all 0.2s ease-in-out;
}

.active .actions {
  padding: 1.4rem;
  max-height: 10rem;
}

.mainContent {
  padding: 1.4rem;
  min-height: 5.02rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.icon {
  height: 2rem;
  width: 2rem;
  transition: all 0.2s ease-in-out;
}

.active .icon {
  color: var(--col-primary, #2564cf);
  cursor: not-allowed;
}

.input {
  align-self: stretch;
  flex-grow: 1;
  border: none;
  font-size: 1.4rem;
  line-height: 2rem;
}

.input:focus {
  outline: none;
}

.submit {
  background: var(--col-primary, #2564cf);
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  line-height: 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.submit:hover {
  background: var(--col-primary-hover, #1e54b7);
}

.iconWrapper {
  background: none;
  border: none;
  padding: 0;
}

.actions .icon {
  color: var(--col-secondary, #797775);
  cursor: not-allowed;
}

.options {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
</style>

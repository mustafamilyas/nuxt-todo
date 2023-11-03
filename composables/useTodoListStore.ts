interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const useTodoListStore = defineStore("todoList", () => {
  const todos = ref<Todo[]>([]);
  const counter = ref(0);

  const activeTodos = computed(() => {
    return todos.value.filter((todo) => !todo.completed);
  });

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed);
  });

  const addTodo = (title: string) => {
    todos.value.push({
      id: String(counter.value++),
      title,
      description: "",
      completed: false,
    });
  };

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const toggleTodo = (id: string) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  };

  return {
    todos,
    activeTodos,
    completedTodos,

    addTodo,
    removeTodo,
    toggleTodo,
  };
});

export default useTodoListStore;

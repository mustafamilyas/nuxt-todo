export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const useTodoListStore = defineStore("todoList", () => {
  const todos = ref<Todo[]>([
    {
      id: "0",
      title: "Learn Vue 3",
      description: "Learn Vue 3 and the composition API",
      completed: false,
    },
  ]);
  const counter = ref(1);

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

  const updateTodo = (todo: Todo) => {
    todos.value = todos.value.map((t) => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
  };

  return {
    todos,
    activeTodos,
    completedTodos,

    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
  };
});

export default useTodoListStore;

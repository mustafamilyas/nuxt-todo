export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

const useTodoListStore = defineStore("todoList", () => {
  const todos = ref<Todo[]>([]);
  const counter = ref(1);

  const activeTodos = computed(() => {
    return todos.value.filter((todo) => !todo.completed);
  });

  const completedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed);
  });

  const addTodo = (title: string) => {
    const newTodo = {
      id: String(counter.value++),
      title,
      description: "",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.value.push(newTodo);
    return newTodo;
  };

  const addTodoComplete = (todo: Todo) => {};

  const removeTodo = (id: string) => {
    const removedTodo = todos.value.find((todo) => todo.id === id);
    todos.value = todos.value.filter((todo) => todo.id !== id);
    return removedTodo;
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

  const syncTodos = (newTodos: Todo[]) => {
    todos.value = newTodos;
  };

  const syncTodoId = (oldId: string, newId: string) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === oldId) {
        return {
          ...todo,
          id: newId,
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
    updateTodo,
    syncTodos,
    syncTodoId,
    addTodoComplete,
  };
});

export default useTodoListStore;

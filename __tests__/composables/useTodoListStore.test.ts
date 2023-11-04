import { it, expect, describe } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import useTodoListStore from "~/composables/useTodoListStore";

describe("Counter Store", () => {
  setActivePinia(createPinia());
  const todoListStore = useTodoListStore();

  it("initial", () => {
    expect(todoListStore.todos.length).toBe(0);
    expect(todoListStore.activeTodos.length).toBe(0);
    expect(todoListStore.completedTodos.length).toBe(0);
  });

  let id = "";
  it("addTodo", () => {
    const addedTodo = todoListStore.addTodo("test");
    id = addedTodo.id;
    expect(todoListStore.todos.length).toBe(1);
    expect(todoListStore.activeTodos.length).toBe(1);
    expect(todoListStore.completedTodos.length).toBe(0);
    expect(todoListStore.todos[0].title).toBe("test");
  });

  it("toggleTodo", () => {
    todoListStore.toggleTodo(id);
    expect(todoListStore.todos.length).toBe(1);
    expect(todoListStore.activeTodos.length).toBe(0);
    expect(todoListStore.completedTodos.length).toBe(1);
  });

  it("removeTodo", () => {
    todoListStore.removeTodo(id);
    expect(todoListStore.todos.length).toBe(0);
    expect(todoListStore.activeTodos.length).toBe(0);
    expect(todoListStore.completedTodos.length).toBe(0);
  });

  it("syncTodo", () => {
    todoListStore.syncTodos([
      {
        id: "1",
        title: "test",
        description: "",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);

    expect(todoListStore.todos.length).toBe(1);
    expect(todoListStore.activeTodos.length).toBe(1);
    expect(todoListStore.completedTodos.length).toBe(0);
  });

  it("updateTodo", () => {
    todoListStore.updateTodo({
      id: "1",
      title: "test",
      description: "test description",
      completed: true,
      createdAt: new Date().toISOString(),
    });
    expect(todoListStore.todos.length).toBe(1);
    expect(todoListStore.activeTodos.length).toBe(0);
    expect(todoListStore.completedTodos.length).toBe(1);

    expect(todoListStore.todos[0].description).toBe("test description");
    expect(todoListStore.todos[0].completed).toBe(true);
  });
});

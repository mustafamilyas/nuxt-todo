// @vitest-environment nuxt

import { it, expect, describe, vi } from "vitest";
import { mockNuxtImport, renderSuspended } from "nuxt-vitest/utils";
import { screen } from "@testing-library/vue";

import TodoItem from "~/components/TodoItem.vue";

// mockNuxtImport("useTodoListStore", () => {
//   return () => {
//     return {
//       todos: [],
//       activeTodos: [],
//       completedTodos: [],

//       addTodo: vi.fn(),
//       removeTodo: vi.fn(),
//       toggleTodo: vi.fn(),
//       updateTodo: vi.fn(),
//       syncTodos: vi.fn(),
//       syncTodoId: vi.fn(),
//       addTodoComplete: vi.fn(),
//     };
//   };
// });

describe("TodoItem", () => {
  it("render TodoItem", async () => {
    await renderSuspended(TodoItem);
    // expect throw error
    expect(
      screen.getByText("This is an auto-imported component")
    ).toBeDefined();
  });
});

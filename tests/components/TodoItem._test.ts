import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/vue";

import TodoItem from "~/components/TodoItem.vue";

describe("TodoItem", () => {
  it("render TodoItem", async () => {
    const wrapper = render(TodoItem, {
      props: {
        id: "1",
        title: "test",
        completed: false,
      },
    });

    expect(wrapper.findAllByTestId("todo-item-checkbox")).toBe(false);
  });
});

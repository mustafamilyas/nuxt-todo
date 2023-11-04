import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/vue";

import TodoItem from "~/components/TodoItem.vue";

const CustomStub = {
  template: '<a v-bind="$attrs" ><slot /></a>',
};

describe("TodoItem", () => {
  it("render TodoItem", async () => {
    const wrapper = await render(TodoItem, {
      props: {
        id: "1",
        title: "test",
        completed: false,
      },
      global: {
        stubs: {
          NuxtLink: CustomStub,
        },
      },
    });
    const title = wrapper.getByTestId("todo-item-title");
    const input = wrapper.getByTestId("todo-item-checkbox");
    const container = wrapper.getByTestId("todo-item");

    expect(title.textContent).toBe("test");
    expect(container.className).not.toEqual(
      expect.stringContaining("completed")
    );
    expect((input as HTMLInputElement)?.checked).toBe(false);
  });

  it("render TodoItem with completed", async () => {
    const wrapper = await render(TodoItem, {
      props: {
        id: "1",
        title: "Fix vue js test bug",
        completed: true,
      },
      global: {
        stubs: {
          NuxtLink: CustomStub,
        },
      },
    });
    const title = wrapper.getByTestId("todo-item-title");
    const input = wrapper.getByTestId("todo-item-checkbox");
    const container = wrapper.getByTestId("todo-item");

    expect(title.textContent).toBe("Fix vue js test bug");
    expect(container.className).toEqual(expect.stringContaining("completed"));
    expect((input as HTMLInputElement)?.checked).toBe(true);
  });
});

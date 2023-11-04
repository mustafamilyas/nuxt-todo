// @vitest-environment nuxt

import { it, expect } from "vitest";
import { renderSuspended } from "nuxt-vitest/utils";
import { screen } from "@testing-library/vue";

import TodoItem from "~/components/TodoItem.vue";

it("render TodoItem", async () => {
  // expect throw an error
  expect(await renderSuspended(TodoItem)).toThrowError();
});

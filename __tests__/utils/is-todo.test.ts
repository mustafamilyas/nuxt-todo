import { describe, it, expect } from "vitest";
import isTodo from "~/utils/is-todo";

describe("isTodo", () => {
  it.concurrent.each([
    [{ id: 1, title: "foo", description: "bar", completed: false }, true],
    [
      {
        id: 1,
        title: "foo",
        description: "bar",
        completed: false,
        createdAt: "2021-01-01",
      },
      true,
    ],
    [
      {
        id: 1,
        title: "foo",
        description: "bar",
        completed: false,
        createdAt: "2021-01-01",
        foo: "bar",
      },
      true,
    ],
    [
      {
        id: 1,
        title: "foo",
        description: "bar",
        completed: false,
        createdAt: "2021-01-01",
        foo: "bar",
        bar: "baz",
      },
      true,
    ],
    [{ id: 1, title: "foo", description: "bar" }, false],
    [{ id: 1, title: "foo", completed: false }, false],
    [{ id: 1, description: "bar", completed: false }, false],
    [{ title: "foo", description: "bar", completed: false }, false],
    ["test", false],
    [1, false],
    [{}, false],
    [null, false],
    [undefined, false],
    [[], false],
    [() => {}, false],
  ])("should return true for %p", (object, expected) => {
    expect(isTodo(object)).toBe(expected);
  });
});

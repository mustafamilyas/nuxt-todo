import { describe, it, expect } from "vitest";
import dateToReadableFull from "./date-to-readable-full";

describe("dateToReadableFull", () => {
  it.concurrent.each([
    [new Date("2020-01-01T10:49:00.000Z"), "Wednesday, 1 January 2020, 10:49"],
    [new Date("2011-10-29T21:18:00.000Z"), "Saturday, 29 October 2011, 21:18"],
  ])("should return true for %p", (object, expected) => {
    expect(dateToReadableFull(object)).toBe(expected);
  });
});

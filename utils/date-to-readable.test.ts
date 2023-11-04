import { describe, it, expect } from "vitest";
import dateToReadable from "./date-to-readable";

describe("dateToReadable", () => {
  it.concurrent.each([
    [new Date("2020-01-01T00:00:00.000Z"), "Wednesday, 1 January 2020"],
    [new Date("2011-10-29T00:00:00.000Z"), "Saturday, 29 October 2011"],
  ])("should return true for %p", (object, expected) => {
    expect(dateToReadable(object)).toBe(expected);
  });
});

import spacetime from "spacetime";

export default function dateToReadableFull(date: Date) {
  return spacetime(date).format("{nice}");
}

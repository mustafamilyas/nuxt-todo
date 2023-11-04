import spacetime from "spacetime";

export default function dateToReadableFull(date: Date) {
  return spacetime(date).format("{day}, {date} {month} {year}, {time-24}");
}

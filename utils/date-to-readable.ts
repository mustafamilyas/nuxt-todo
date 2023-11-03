import spacetime from "spacetime";

export default function dateToReadable(date: Date) {
  return spacetime(date).format("{day}, {date} {month} {year}");
}

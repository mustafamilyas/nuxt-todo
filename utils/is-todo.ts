export function isTodo(object: any): object is Todo {
  return (
    typeof object === "object" &&
    object.id != null &&
    object.title != null &&
    object.description != null &&
    object.completed != null
  );
}

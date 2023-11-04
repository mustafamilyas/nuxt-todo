export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  if (typeof id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid resources",
    });
  }

  const body = await readBody(event);
  if (
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    typeof body.completed !== "boolean" ||
    typeof body.createdAt !== "string" ||
    typeof body.id === "string"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  try {
    var response = await $fetch(`${config.apiBe}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update todo",
    });
  }

  return response;
});

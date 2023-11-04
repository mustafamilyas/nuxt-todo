export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id");

  if (typeof id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid resources",
    });
  }

  try {
    await $fetch(`${config.apiBe}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete todo",
    });
  }

  return { id };
});

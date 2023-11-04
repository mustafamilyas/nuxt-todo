export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    typeof body.completed !== "boolean"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body",
    });
  }

  const dateNow = new Date();
  const dateNowString = dateNow.toISOString();
  const id = dateNow.getTime().toString();

  try {
    await $fetch(`${config.apiBe}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        id,
        createdAt: dateNowString,
      }),
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create todo",
    });
  }

  return { id };
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const response = await $fetch(`${config.apiBe}/todos`);
  return response;
});

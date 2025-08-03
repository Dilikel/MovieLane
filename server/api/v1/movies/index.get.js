export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  try {
    const movies = await $fetch(`${config.public.API_URL}/movie`, {
      params: { name: query.name },
      // headers: {
      // 	'Content-Type': 'application/json',
      // 	'x-api-password': config.public.SECRET_KEY,
      // },
    });

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch movies',
    });
  }
});

export default defineEventHandler(async (event) => {
  const movieId = getRouterParam(event, 'id');

  if (!movieId) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Missing movie ID' }),
    );
  }
  const config = useRuntimeConfig();

  try {
    const movie = await $fetch(`${config.public.API_URL}/movie/${movieId}`, {
      // headers: {
      // 	'Content-Type': 'application/json',
      // 	'x-api-password': config.public.SECRET_KEY,
      // },
    });

    return movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch movie',
    });
  }
});

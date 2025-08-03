import { useUserStore } from '~/stores/user';
import type { LoginResponse } from '~/types/user';

export function useAuth() {
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const token = useCookie('token');

  async function fetchUser(isLoading: Ref<boolean>) {
    if (!token.value || token.value.trim() === '') return;

    if (isLoading) isLoading.value = true;

    await $fetch<LoginResponse>(`${config.public.API_URL}/v1/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then((response) => {
        userStore.setUser({
          ...response.user,
        });
        token.value = response.token;
      })
      .catch((error) => {
        token.value = null;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  return {
    fetchUser,
  };
}

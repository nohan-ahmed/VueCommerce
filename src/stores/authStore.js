import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import authService from '@/appwrite/auth';

export const useAuthStore = defineStore('authStore', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user'))); // Stores user information
  const error = ref(null); // Stores error messages

  watch(user, () => {
    localStorage.setItem('user', JSON.stringify(user.value));
  }, {
    deep: true,
  })
  // Derived State (Getters)
  const isAuthenticated = computed(() => user.value != null);

  // Actions
  const loginUser = async (email, password) => {
    try {
      const session = await authService.login({ email, password });
      const userDetails = await authService.getUser();
      user.value = userDetails;
      error.value = null;
      return session;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const registerUser = async (email, password, name) => {
    try {
      const session = await authService.createAccount({ email, password, name });
      user.value = await authService.getUser();
      error.value = null;
      return session;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const fetchUser = async () => {
    try {
      user.value = await authService.getUser();
      error.value = null;
      console.log('authStore: ', user);
    } catch (err) {
      user.value = null;
      error.value = err.message;
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
      user.value = null;
      error.value = null;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Return state, actions, and getters
  return {
    user,
    error,
    isAuthenticated,
    loginUser,
    registerUser,
    fetchUser,
    logoutUser,
  };
});

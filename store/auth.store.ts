interface IAuthStore {
  email: string;
  name: string;
  status: boolean;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    setUser(authData: IAuthStore) {
      this.$patch({ user: authData });
    },
  },
});

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    setIsLoading(isLoading: boolean) {
      this.$patch({ isLoading });
    },
  },
});

interface IAuthStore {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    isLoggedIn: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.isLoggedIn,
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(authData: IAuthStore) {
      this.$patch({ user: authData });
    },
  },
});

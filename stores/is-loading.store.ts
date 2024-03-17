interface ILoading {
  isLoading: boolean;
}

const defaultValue: { loader: ILoading } = {
  loader: {
    isLoading: true,
  },
};

export const useIsLoadingStore = defineStore("loading", {
  state: () => defaultValue,
  actions: {
    set(loadingData: ILoading) {
      this.$patch({ loader: loadingData });
    },
  },
});

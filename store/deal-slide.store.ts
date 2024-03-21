import type { Card } from "@/components/kanban/kanban.types";

interface DealSlideStore {
  card: Card | null;
  isOpen: boolean;
}

const defaultValue: DealSlideStore = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    setCard(card: Card) {
      this.$patch({ card, isOpen: true });
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});

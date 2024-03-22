import { useQuery } from "@tanstack/vue-query";
import { DB } from "@/lib/appwrite";
import { COLLECTION_DEALS, DB_ID } from "@/app.constants";

export function useCommentsByDeal() {
  const dealStore = useDealSlideStore();
  const cardId = dealStore.card?.id ?? "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
  });
}

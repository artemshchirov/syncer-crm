import { useMutation, useQueryClient, type InvalidateQueryFilters } from "@tanstack/vue-query";
import { COLLECTION_COMMENTS, DB_ID } from "@/app.constants";
import { DB, ID } from "@/lib/appwrite";

export function useCreateDealComment() {
  const toast = useToast();

  const queryClient = useQueryClient();

  const dealStore = useDealSlideStore();
  const cardId = dealStore.card?.id;

  const commentRef = ref<string>();

  const { mutate } = useMutation({
    mutationKey: ["add-comments", commentRef.value],
    mutationFn: async () => {
      await DB.createDocument(DB_ID, COLLECTION_COMMENTS, ID.unique(), {
        text: commentRef.value,
        deal: cardId,
      });
    },
    onSuccess: () => {
      const queryKey = ["deal", cardId] as MaybeRef<InvalidateQueryFilters> | undefined;
      queryClient.invalidateQueries(queryKey);
      commentRef.value = "";
    },
    onError(error) {
      console.error(error);
      const errorMessage = (error as Error).message || "An unknown error occurred";
      toast.add({
        title: "Error while adding comment",
        description: errorMessage,
        color: "red",
      });
    },
  });

  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };

  return {
    writeComment,
    commentRef,
  };
}

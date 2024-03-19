import { useQuery } from "@tanstack/vue-query";
import { DB } from "@/lib/appwrite";
import { COLLECTION_DEALS, DB_ID } from "@/app.constants";
import { KANBAN_DATA } from "@/components/kanban/kanban.data";
import type { Deal } from "@/types/deals.types";

export function useKanbanQuery() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const newBoard = [...KANBAN_DATA];
      const deals = data.documents as unknown as Deal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          column.items.push({
            id: deal.$id,
            $createdAt: deal.$createdAt,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer.name,
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
}

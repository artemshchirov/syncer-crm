import type { EnumStatus } from "@/types/deals.types";

export interface Card {
  id: string;
  name: string;
  price: number;
  $createdAt: string;
  companyName: string;
  status: string;
}

export interface Column {
  id: EnumStatus;
  name: string;
  items: Card[];
}

export interface DropResult {
  removedIndex: number | null;
  addedIndex: number | null;
  payload: undefined;
}

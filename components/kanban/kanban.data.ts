import { EnumStatus } from "@/types/deals.types";
import type { Column } from "./kanban.types";

export const KANBAN_DATA: Column[] = [
  {
    id: EnumStatus.todo,
    name: "Incoming",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "Pending Approval",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "In Production",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Ready for Shipment",
    items: [],
  },
];

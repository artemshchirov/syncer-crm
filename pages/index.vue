<script setup lang="ts">
import type { Column, Card } from "@/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import { convertCurrency } from "@/lib/utils";
import { useMutation } from "@tanstack/vue-query";
import dayjs from "dayjs";
import { COLLECTION_DEALS, DB_ID } from "@/app.constants";
import { DB } from "@/lib/appwrite";
import type { EnumStatus } from "@/types/deals.types";
import { generateColumnStyle } from "../components/kanban/generate-gradient";

useHead({ title: "Home | Syncer CRM" });

const dragCardRef = ref<Card | null>(null);
const sourceColumnRef = ref<Column | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();

type MutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: async ({ docId, status }: MutationVariables) => {
    await DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status });
  },
  onSuccess() {
    refetch();
  },
});

function handleDragStart(column: Column, card: Card) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: Column) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="mb-10 text-2xl font-bold">Syncer CRM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="grid grid-cols-5 md:gap-8 xl:gap-16">
      <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)">
        <div
          class="px-5 py-1 mb-2 overflow-hidden text-center rounded bg-slate-700 whitespace-nowrap text-ellipsis"
          :style="generateColumnStyle(index, data?.length)"
        >
          {{ column.name }}
        </div>

        <KanbanCreateDeal :refetch="refetch" :status="column.id" />

        <UiCard
          v-for="card in column.items"
          :key="card.id"
          class="mb-3"
          draggable="true"
          @dragstart="() => handleDragStart(column, card)"
        >
          <UiCardHeader role="button">
            <UiCardTitle>{{ card.name }}</UiCardTitle>
            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent
            ><div>Customer</div>
            {{ card.companyName }}</UiCardContent
          >
          <UiCardFooter>{{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}</UiCardFooter>
        </UiCard>
      </div>
    </div>
  </div>
</template>
../lib/convertCurrency

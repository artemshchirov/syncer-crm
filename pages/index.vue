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

const toast = useToast();
const dragCardRef = ref<Card | null>(null);
const sourceColumnRef = ref<Column | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();
const dealStore = useDealSlideStore();

type MutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate, isPending } = useMutation({
  mutationKey: ["move-card"],
  mutationFn: async ({ docId, status }: MutationVariables) => {
    await DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status });
  },
  onSuccess() {
    refetch();
  },
  onError(error) {
    console.error(error);
    const errorMessage = (error as Error).message || "An unknown error occurred";
    toast.add({
      title: "Error while moving card",
      description: errorMessage,
      color: "red",
    });
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
    if (targetColumn.id === sourceColumnRef.value.id) return;
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="relative min-h-screen p-10">
    <h1 class="mb-10 text-2xl font-bold">Syncer CRM</h1>
    <NuxtImg
      v-if="isLoading"
      src="/loader.svg"
      alt="Loader"
      width="100"
      class="absolute inset-0 m-auto"
    />
    <div v-else class="grid grid-cols-5 md:gap-8 xl:gap-16">
      <div
        v-for="(column, index) in data"
        :key="column.id"
        @dragover="handleDragOver"
        @drop="() => handleDrop(column)"
        class="min-h-[75vh]"
      >
        <div
          class="px-5 mb-2 rounded bg-slate-700 h-[37px] flex justify-center items-center"
          :style="generateColumnStyle(index, data?.length)"
        >
          <p
            v-if="!isPending && !isLoading"
            class="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ column.name }}
          </p>
          <NuxtImg v-else src="/loader.svg" alt="Loader" width="50" />
        </div>

        <KanbanCreateDeal :refetch="refetch" :status="column.id" />

        <UiCard
          v-for="card in column.items"
          :key="card.id"
          class="mb-3"
          draggable="true"
          @dragstart="() => handleDragStart(column, card)"
        >
          <UiCardHeader role="button" @click="dealStore.setCard(card)">
            <UiCardTitle>{{ card.name }} </UiCardTitle>
            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent
            ><div>Customer</div>
            {{ card.companyName }}</UiCardContent
          >
          <UiCardFooter>{{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}</UiCardFooter>
        </UiCard>
      </div>

      <KanbanSlideover />
    </div>
  </div>
</template>

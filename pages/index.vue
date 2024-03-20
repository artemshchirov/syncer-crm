<script setup lang="ts">
import type { Column, Card } from "@/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import { convertCurrency } from "@/lib/utils";
import dayjs from "dayjs";

useHead({ title: "Home | Syncer CRM" });

const sourceColumnRef = ref<Column | null>(null);
const dragCardRef = ref<Card | null>(null);

const { data, isLoading, refetch } = useKanbanQuery();
</script>

<template>
  <div class="p-10">
    <h1 class="mb-10 text-2xl font-bold">Syncer CRM</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="grid grid-cols-5 md:gap-8 xl:gap-16">
      <div v-for="(column, index) in data" :key="column.id">
        <div class="px-5 py-1 mb-2 overflow-hidden text-center rounded bg-slate-700 whitespace-nowrap text-ellipsis">
          {{ column.name }}
        </div>

        <KanbanCreateDeal :refetch="refetch" :status="column.id" />

        <UiCard v-for="card in column.items" :key="card.id" class="mb-3" draggable="true">
          <UiCardHeader role="button">
            <UiCardTitle>{{ card.name }}</UiCardTitle>
            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent
            ><div>Company</div>
            {{ card.companyName }}</UiCardContent
          >
          <UiCardFooter>{{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}</UiCardFooter>
        </UiCard>
      </div>
    </div>
  </div>
</template>
../lib/convertCurrency

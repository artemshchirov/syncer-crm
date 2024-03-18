<script setup lang="ts">
import type { Column, Card } from "@/components/kanban/kanban.types";
useHead({ title: "Home | Syncer CRM" });

const sourceColumnRef = ref<Column | null>(null);
const dragCardRef = ref<Card | null>(null);
</script>

<template>
  <div class="p-10">
    <h1 class="mb-10 text-2xl font-bold">Syncer CRM</h1>
    <UiCard class="mb-3" draggable="true">
      <UiCardHeader role="button">name card</UiCardHeader>
      <UiCardContent>Company</UiCardContent>
      <UiCardFooter>Date</UiCardFooter>
    </UiCard>
  </div>
</template>

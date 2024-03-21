<script setup lang="ts">
import dayjs from "dayjs";
import { useDealSlideStore } from "@/store/deal-slide.store";
import { convertCurrency } from "@/lib/utils";

const dealStore = useDealSlideStore();
</script>

<template>
  <div class="p-3 rounded border-border bg-black/20">
    <div class="mb-4 text-xl uppercase bold">About Deal</div>
    <KanbanSlideoverLabel label-text="Deal Name">
      <h3>
        {{ dealStore.card?.name }}
      </h3>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Deal Price">
      {{ convertCurrency(dealStore.card?.price ?? 0) }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Status">
      <UBadge variant="outline">
        {{ dealStore.card?.status }}
      </UBadge>
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Customer">
      {{ dealStore.card?.companyName }}
    </KanbanSlideoverLabel>
    <KanbanSlideoverLabel label-text="Date">
      {{ dayjs(dealStore.card?.$createdAt).format("DD MMM YYYY") }}
    </KanbanSlideoverLabel>
  </div>
</template>

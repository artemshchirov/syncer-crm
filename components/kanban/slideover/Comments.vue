<script lang="ts" setup>
import dayjs from "dayjs";
import type { Deal } from "@/types/deals.types";
import { useCreateDealComment } from "./useCreateDealComment";
import { useCommentsByDeal } from "./useCommentsByDeal";

const { data, refetch, isLoading } = useCommentsByDeal();
const { commentRef, writeComment } = useCreateDealComment();

const card = data as unknown as Deal;
</script>

<template>
  <UInput placeholder="Add comment" v-model="commentRef" @keyup.enter="writeComment" />

  <USkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5" />
  <div v-else-if="card">
    <div v-for="comment in card.comments" :key="comment.$id" class="flex items-start mt-5">
      <Icon name="radix-icons:chat-bubble" class="mt-1 mr-3" size="25" />
      <div class="w-full p-3 rounded border-border bg-black/20">
        <div class="mb-2 text-sm">{{ dayjs(comment.$createdAt).format("HH:mm") }}</div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

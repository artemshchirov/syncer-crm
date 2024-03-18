<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground animation border-transparent transition-colors hover:border-[#a252c83d]',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>

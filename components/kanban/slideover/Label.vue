<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  labelText: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <h2 v-if="labelText" class="opacity-75 mb-0.5 block text-xs">{{ labelText }}</h2>
  <div class="mb-3">
    <slot />
  </div>
</template>

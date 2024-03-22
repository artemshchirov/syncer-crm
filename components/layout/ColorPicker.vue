<!-- https://color-mode.nuxtjs.org/ -->
<!-- https://ui.nuxt.com/getting-started/theming -->

<script setup lang="ts">
import { computed } from "vue";

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <UButton
    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
    color="gray"
    variant="ghost"
    aria-label="Theme"
    @click="isDark = !isDark"
  />
</template>

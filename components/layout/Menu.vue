<script setup lang="ts">
import { MENU_DATA } from "./menu.data";
</script>

<template>
  <div>
    <NuxtLink
      class="flex items-center w-full px-3 py-1 mb-2.5 transition-all rounded-lg hover:bg-gray-700 hover:shadow whitespace-nowrap"
      v-for="item in MENU_DATA"
      :key="item.title"
      :to="item.path"
    >
      <Icon :name="item.icon" class="mr-3" />
      <span>{{ item.title }}</span>
    </NuxtLink>
  </div>
</template>

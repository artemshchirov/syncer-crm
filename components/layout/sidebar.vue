<scrip setup lang="ts"></scrip>

<template>
  <aside class="relative w-full h-full px-5 py-8 bg-sidebar">
    <NuxtLink to="/" class="block my-10"> <NuxtImg src="/logo.svg" alt="Logo" class="mx-auto w-[120px]" /></NuxtLink>

    <button class="absolute transition-colors top-2 right-3 hover:text-primary">
      <Icon name="line-md:logout" size="20" />
    </button>

    <LayoutMenu />
  </aside>
</template>

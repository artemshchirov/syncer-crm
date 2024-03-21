<script lang="ts" setup>
const dealStore = useDealSlideStore();

const isLocalOpen = computed({
  get: () => dealStore.isOpen,
  set: (value) => (dealStore.isOpen = value),
});
</script>

<template>
  <div>
    <USlideover v-model="isLocalOpen">
      <UCard
        class="flex flex-col flex-1 overflow-y-auto"
        :ui="{
          body: { base: 'flex-1', ring: '', divide: 'divide-y directives' },
        }"
      >
        <template #header>
          <KanbanSlideoverHeader />
        </template>

        <KanbanSlideoverComments />
      </UCard>
    </USlideover>
  </div>
</template>

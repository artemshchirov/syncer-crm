<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_CUSTOMERS } from "@/app.constants";
import { DB } from "@/lib/appwrite";
import type { Customer } from "@/types/deals.types";

useHead({ title: "Customers | Syncer CRM" });

const toast = useToast();

const { data, isLoading, error, isError } = useQuery({
  queryKey: ["customers"],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});

const customers = computed(() => data.value?.documents as unknown as Customer[]);

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return customers.value;
  }

  return customers.value.filter((customer) => {
    return Object.values(customer).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const columns = [
  {
    key: "avatar_url",
    label: "Image",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "from_source",
    label: "Source",
    sortable: true,
  },
];
</script>

<template>
  <div class="relative min-h-screen p-10">
    <h1 class="mb-10 text-2xl font-bold">Customers</h1>
    <NuxtImg
      v-if="isLoading"
      src="/loader.svg"
      alt="Loader"
      width="100"
      class="absolute inset-0 m-auto"
    />
    <div v-else>
      <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UInput v-model="q" placeholder="Filter people..." />
      </div>

      <UTable :columns="columns" :rows="filteredRows">
        <template #avatar_url-data="{ row }">
          <NuxtLink :href="`/customers/edit/${row.$id}`">
            <NuxtImg
              :src="row.avatar_url"
              :alt="row.name"
              width="50"
              height="50"
              class="rounded-full"
          /></NuxtLink>
        </template>
      </UTable>
    </div>
  </div>
</template>

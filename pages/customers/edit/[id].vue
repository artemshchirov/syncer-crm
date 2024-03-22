<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { DB_ID, COLLECTION_CUSTOMERS } from "@/app.constants";
import { DB } from "@/lib/appwrite";

useHead({ title: "Edit Customer | Syncer CRM" });

interface CustomerFormState {
  avatar_url: string;
  name: string;
  email: string;
  from_source: string;
}

const route = useRoute();
const customerId = (route.params.id as string) || "";

const schema = z.object({
  avatar_url: z.string().url("Invalid URL").optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  from_source: z.string().optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<CustomerFormState>({
  avatar_url: "",
  name: "",
  email: "",
  from_source: "",
});

const { data, isLoading, isSuccess } = useQuery({
  queryKey: ["get-customer", customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId),
});

const { mutate, isPending } = useMutation({
  mutationKey: ["update-customer", customerId],
  mutationFn: (data: CustomerFormState) =>
    DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data),
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData: CustomerFormState = {
    avatar_url: event.data.avatar_url ?? "",
    name: event.data.name,
    email: event.data.email,
    from_source: event.data.from_source ?? "",
  };

  mutate(formData);
}

watch(isSuccess, () => {
  console.log(isSuccess.value, data.value);

  if (isSuccess.value && data.value) {
    console.log(data.value);

    const initialData: CustomerFormState = data.value as unknown as CustomerFormState;
    state.avatar_url = initialData.avatar_url ?? "";
    state.name = initialData.name;
    state.email = initialData.email;
    state.from_source = initialData.from_source ?? "";
  }
});
</script>

<template>
  <div class="relative min-h-screen p-10">
    <h1 class="mb-10 text-2xl font-bold">Edit Customer</h1>
    <NuxtImg
      v-if="isLoading"
      src="/loader.svg"
      alt="Loader"
      width="100"
      class="absolute inset-0 m-auto"
    />
    <UForm v-else :schema="schema" :state="state" class="space-y-4 max-w-[30vw]" @submit="onSubmit">
      <UFormGroup label="Avatar URL" name="avatar_url">
        <UInput v-model="state.avatar_url" />
      </UFormGroup>

      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Source" name="from_source">
        <UInput v-model="state.from_source" />
      </UFormGroup>

      <UButton type="submit" block :disabled="isPending">
        {{ isPending ? "Editing..." : "Edit" }}</UButton
      >
    </UForm>
  </div>
</template>

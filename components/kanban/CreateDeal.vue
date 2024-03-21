<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { defineProps } from "vue";
import { ID, DB } from "@/lib/appwrite";
import { COLLECTION_DEALS, DB_ID } from "@/app.constants";
import type { Deal } from "@/types/deals.types";
import { useToast } from "@/components/ui/toast";

interface DealFormState extends Pick<Deal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

interface Props {
  status: string;
  refetch: () => void;
}

const props = withDefaults(defineProps<Readonly<Props>>(), {
  status: "",
});

const { toast } = useToast();
const isOpenForm = ref(false);

const { handleSubmit, defineField, handleReset } = useForm<DealFormState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [customerEmail, customerEmailAttrs] = defineField("customer.email");
const [customerName, customerNameAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["createDeal"],
  mutationFn: (data: DealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, ID.unique(), data),
  onSuccess() {
    props.refetch();
    handleReset();
    isOpenForm.value = false;
  },
  onError(error) {
    console.error(error);
    const errorMessage = (error as Error).message || "An unknown error occurred";
    toast({
      title: "Error while creating deal",
      description: errorMessage,
      variant: "destructive",
    });
  },
});

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<template>
  <div class="mb-2 text-center">
    <button class="transition-all opacity-10 hover:opacity-100 hover:text-[#a252c8]" @click="isOpenForm = !isOpenForm">
      <Icon v-if="isOpenForm" name="radix-icons:minus-circled" class="fade-in-100 fade-out-0" size="30" />
      <Icon v-else name="radix-icons:plus-circled" class="fade-in-100 fade-out-0" size="30" />
    </button>
  </div>

  <form v-if="isOpenForm" @submit="onSubmit" class="form">
    <UiInput v-model="name" v-bind="nameAttrs" class="input" placeholder="Deal name" type="text" />
    <UiInput v-model="price" v-bind="priceAttrs" class="input" placeholder="Deal price" type="text" />
    <UiInput
      v-model="customerEmail"
      v-bind="customerEmailAttrs"
      class="input"
      placeholder="Customer email"
      type="text"
    />
    <UiInput v-model="customerName" v-bind="customerNameAttrs" class="input" placeholder="Customer name" type="text" />
    <button class="w-full btn bg-secondary" :disabled="isPending">{{ isPending ? "Adding..." : "Add" }}</button>
  </form>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

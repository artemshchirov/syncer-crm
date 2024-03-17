<script setup lang="ts">
useHead({
  title: "Login | Syncer CRM",
  meta: [
    {
      name: "description",
      content: "Login to Syncer CRM",
    },
  ],
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const router = useRouter();
</script>

<template>
  <div class="flex items-center justify-center w-full min-h-screen">
    <div class="w-1/4 p-5 rounded bg-sidebar">
      <h1 class="mb-5 text-2xl font-bold text-center">Login</h1>

      <form>
        <UiInput placeholder="Email" type="email" class="mb-3" v-model="emailRef" />
        <UiInput placeholder="Password" type="email" class="mb-3" v-model="passwordRef" />
        <UiInput placeholder="Name" type="email" class="mb-3" v-model="nameRef" />
        <div class="flex items-center justify-center gap-5">
          <UiButton type="button">Login</UiButton>
          <UiButton type="button">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

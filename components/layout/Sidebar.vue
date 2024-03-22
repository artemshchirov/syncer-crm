<script setup lang="ts">
import { account } from "@/lib/appwrite";

const toast = useToast();

const authStore = useAuthStore();
const loaderStore = useLoaderStore();
const router = useRouter();

const logout = async () => {
  loaderStore.setIsLoading(true);
  try {
    await account.deleteSession("current");
    authStore.clear();
    await router.push("/login");
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message || "An unknown error occurred";
    toast.add({
      title: "Error while logging in",
      description: errorMessage,
      color: "red",
    });
  } finally {
    loaderStore.setIsLoading(false);
  }
};
</script>

<template>
  <aside class="relative w-full h-full px-5 py-8 bg-sidebar">
    <NuxtLink to="/" class="block my-10">
      <NuxtImg src="/logo.svg" alt="Logo" class="mx-auto w-[120px]"
    /></NuxtLink>

    <LayoutColorPicker class="absolute top-2 left-3" />

    <UButton
      @click="logout"
      class="absolute top-2 right-3"
      color="gray"
      variant="ghost"
      aria-label="Logout"
      :icon="'i-heroicons-arrow-right-end-on-rectangle-20-solid'"
    />

    <LayoutMenu />
  </aside>
</template>

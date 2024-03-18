<script setup lang="ts">
import { account } from "@/lib/appwrite";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();

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
    toast({
      title: "Error while logging in",
      description: errorMessage,
      variant: "destructive",
    });
  } finally {
    loaderStore.setIsLoading(false);
  }
};
</script>

<template>
  <aside class="relative w-full h-full px-5 py-8 bg-sidebar">
    <NuxtLink to="/" class="block my-10"> <NuxtImg src="/logo.svg" alt="Logo" class="mx-auto w-[120px]" /></NuxtLink>

    <button class="absolute transition-colors top-2 right-3 hover:text-primary" @click="logout">
      <Icon name="line-md:logout" size="20" />
    </button>

    <LayoutMenu />
  </aside>
</template>

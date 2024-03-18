<script setup lang="ts">
import { account } from "@/lib/appwrite";

const authStore = useAuthStore();
const loaderStore = useLoaderStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) authStore.setUser(user);
  } catch (error) {
    console.error(error);
    router.push("/login");
  } finally {
    loaderStore.setIsLoading(false);
  }
});
</script>

<template>
  <LayoutLoader v-if="loaderStore.isLoading" />
  <section v-else :class="{ grid: authStore.isAuth }" style="min-height: 100vh">
    <LayoutSidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>

<script setup lang="ts">
import { ID, account } from "@/lib/appwrite";
import { useToast } from "@/components/ui/toast/use-toast";

useHead({ title: "Login | Syncer CRM" });

const toast = useToast();

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const authStore = useAuthStore();
const loaderStore = useLoaderStore();
const router = useRouter();

const login = async () => {
  loaderStore.setIsLoading(true);
  try {
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

    const user = await account.get();
    if (user) authStore.setUser(user);

    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";

    await router.push("/");
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

const register = async () => {
  loaderStore.setIsLoading(true);
  try {
    await account.create(ID.unique(), emailRef.value, passwordRef.value, nameRef.value);
    await login();
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message || "An unknown error occurred";
    toast.add({
      title: "Error while registering",
      description: errorMessage,
      color: "red",
    });
  } finally {
    loaderStore.setIsLoading(false);
  }
};
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
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

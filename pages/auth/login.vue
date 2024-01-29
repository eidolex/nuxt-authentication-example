<script lang="ts" setup>
import { ref } from "vue";

const form = ref({
  email: "test@example.com",
  password: "password",
});

const auth = useAuthStore();

async function handleLogin() {
  const {} = auth.login(form.value);
}
</script>

<template>
  <div>
    <pre>{{ auth.user }}</pre>
    <form @submit.prevent="handleLogin">
      <input type="text" placeholder="email" v-model="form.email" />
      <input type="password" placeholder="password" v-model="form.password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>

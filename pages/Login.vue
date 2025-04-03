<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome to Empire Coffee</h1>
      <p class="subtitle">Please log in to continue</p>
      <input v-model="username" placeholder="Username" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button @click="handleLogin" class="login-button">Login</button>
      <p v-if="error" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref(false);
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const { success, message } = await authStore.login(username.value, password.value);
  if (success) {
    router.push('/account');
  } else {
    error.value = true;
    errorMessage.value = message;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #d7ccc8, #a1887f);
  font-family: 'Arial', sans-serif;
}

.login-card {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

.title {
  font-size: 24px;
  color: #6d4c41;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #8d6e63;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background: #6d4c41;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background: #5d4037;
}

.error-message {
  color: #d32f2f;
  font-size: 14px;
  margin-top: 10px;
}
</style>
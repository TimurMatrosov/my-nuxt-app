<template>
  <div class="account-container">
    <div class="account-header">
      <h1 class="title">Welcome to Coffee Empire</h1>
      <p v-if="authStore.user" class="welcome-message">Hello, {{ authStore.user }}!</p>
      <p v-else class="welcome-message">Please log in to access your account.</p>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>

    <div class="table-container">
      <TableComponents />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import TableComponents from '~/components/TableComponents.vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.loadUser();
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.account-container {
  padding: 20px;
  background: linear-gradient(to bottom, #d7ccc8, #a1887f);
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

.account-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 28px;
  color: #6d4c41;
}

.welcome-message {
  font-size: 18px;
  color: #8d6e63;
  margin: 10px 0;
}

.logout-button {
  padding: 10px 20px;
  background: #6d4c41;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  background: #5d4037;
}

.table-container {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
// /Users/timurmatrosov/my-nuxt-app/store/auth.ts
import { defineStore } from 'pinia';
import users from '~/users.json'; // Import the users.json file
import CryptoJS from 'crypto-js'; // Import crypto-js for hashing

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    login(username: string, password: string): { success: boolean; message: string } {
      // Hash the input password
      const hashedPassword = this.hashPassword(password);

      // Find the user in the users.json file
      const user = users.find(
        (u) =>
          u.credentials.username === username &&
          u.credentials.passphrase === hashedPassword // Compare hashed passwords
      );

      if (user && user.active) {
        this.user = `${user.name} ${user.surname}`;
        this.isAuthenticated = true;

        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }

        return { success: true, message: 'Login successful' };
      }

      return { success: false, message: 'Invalid username or password' };
    },

    logout(): void {
      this.user = null;
      this.isAuthenticated = false;

      if (process.client) {
        localStorage.removeItem('user');
      }
    },

    loadUser(): void {
      if (process.client) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
          this.isAuthenticated = true;
        }
      }
    },

    // Helper function to hash the password using crypto-js
    hashPassword(password: string): string {
      return CryptoJS.MD5(password).toString();
    },
  },
});
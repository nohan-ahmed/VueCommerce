<template>
  <Default>
    <template #default>
      <div>
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <div class="text-subtitle-1 text-medium-emphasis">Account</div>

          <v-text-field
            v-model="form.email"
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password

            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</a
            >
          </div>

          <v-text-field
            v-model="form.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              {{ errorMessage }}
            </v-card-text>
          </v-card>

          <v-btn
            @click="submitForm"
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
          >
            Log In
          </v-btn>

          <v-card-text class="text-center">
            <RouterLink
              :to="{ name: 'Register' }"
              class="text-blue text-decoration-none"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </RouterLink>
          </v-card-text>
        </v-card>
      </div>
    </template>
  </Default>
</template>

<script setup>
import Default from "@/layouts/Default.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";

const visible = ref(false);
const errorMessage = ref("");
// Store define

const authStore = useAuthStore();

// Check if the user is authenticated and redirect to the home page if so.
if (authStore.isAuthenticated) {
    router.push({name: 'Home'})
  console.log('isAuthenticated..');
}

// Reactive state for form data
const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const formValid = ref(false);

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Enter a valid email",
};

// Submit function
const submitForm = async () => {
  // Simulate API call
  try {
    await authStore.loginUser(form.value.email, form.value.password);
    console.log(`Login Successful! Email: ${form.value.email}`);
    form.value = { email: "", password: "", rememberMe: false };
    router.push({name: 'Home'})
  } catch (error) {
    console.error("Login failed:", error.message);
    errorMessage.value = error.message;
    return;
  }

  // Reset form
};



</script>

<style scoped>
.login-page {
  background-color: #f9f9f9;
  padding: 40px 0;
}
.text-decoration-none {
  text-decoration: none;
  color: #3f51b5;
}
.text-decoration-none:hover {
  text-decoration: underline;
}
</style>

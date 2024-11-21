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
            v-model="form.name"
            :rules="[rules.required]"
            density="compact"
            placeholder="Full name"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            type="email"
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :rules="[rules.required, rules.minLength(8)]"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordVisible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="togglePasswordVisibility"
          ></v-text-field>

          <v-text-field
            v-model="form.confirmPassword"
            :rules="[rules.required, matchPassword]"
            :append-inner-icon="
              confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
            "
            :type="confirmPasswordVisible ? 'text' : 'password'"
            density="compact"
            placeholder="Confirm your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="toggleConfirmPasswordVisibility"
          ></v-text-field>

          <v-card
            v-if="errorMessage"
            class="mb-12"
            color="error"
            variant="tonal"
          >
            <v-card-text class="text-light text-caption">
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
            Registration
          </v-btn>

          <v-card-text class="text-center">
            <p>I already have an account</p>
            <RouterLink
              :to="{ name: 'Login' }"
              class="text-blue text-decoration-none"
            >
              Login here<v-icon icon="mdi-chevron-right"></v-icon>
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

const authStore = useAuthStore();

// State for visibility toggles
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

// Error message state
const errorMessage = ref("");

// Reactive state for form data
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Enter a valid email",
  minLength: (min) => (value) =>
    value.length >= min || `Minimum ${min} characters required`,
};

// Custom rule to match passwords
const matchPassword = (value) =>
  value === form.value.password || "Passwords must match";

// Toggle visibility functions
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

// Form submission
const submitForm = async () => {
  errorMessage.value = "";

  // Validate all fields
  const isValid = [
    rules.required(form.value.name),
    rules.required(form.value.email),
    rules.email(form.value.email),
    rules.required(form.value.password),
    rules.minLength(8)(form.value.password),
    rules.required(form.value.confirmPassword),
    matchPassword(form.value.confirmPassword),
  ].every((result) => result === true);

  if (!isValid) {
    errorMessage.value = "Please fill in all fields correctly.";
    return;
  }

  try {
    // Simulate API call or integration with authStore
    delete form.value.confirmPassword;
    await authStore.registerUser(
      form.value.email,
      form.value.password,
      form.value.name
    );

    console.log("Registration Successful!");
    form.value = { name: "", email: "", password: "", confirmPassword: "" };
    router.push({name: 'Home'})
  } catch (error) {
    errorMessage.value = error.message;
  }
};

if(authStore.isAuthenticated){
  router.push({name:'Home'})
}
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

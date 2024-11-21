<template>
  <Default>
    <template #default>
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center">
          <h1 class="display-2 font-weight-bold">Contact Us</h1>
          <p class="subtitle-1 mt-2">
            Have questions or need assistance? We’d love to hear from you!
          </p>
        </v-col>
      </v-row>

      <v-row class="contact-section" justify="center" align="stretch">
        <!-- Contact Form -->
        <v-col cols="12" md="6">
          <v-card class="pa-5 elevation-3">
            <v-form v-model="formValid" ref="form">
              <v-text-field
                label="Full Name"
                v-model="form.name"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Email Address"
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                outlined
                dense
              ></v-text-field>
              <v-textarea
                label="Message"
                v-model="form.message"
                :rules="[rules.required]"
                outlined
                dense
                rows="4"
              ></v-textarea>
              <v-btn
                color="primary"
                class="mt-4"
                large
                :disabled="!formValid"
                @click="submitForm"
              >
                Send Message
              </v-btn>
            </v-form>
          </v-card>
        </v-col>

        <!-- Contact Information -->
        <v-col cols="12" md="4" class="text-center">
          <v-card class="pa-5 elevation-3">
            <h2 class="headline font-weight-bold">Get in Touch</h2>
            <v-divider class="my-3"></v-divider>
            <p class="body-1">
              <v-icon color="primary" left>mdi-phone</v-icon>
              +1 123 456 7890
            </p>
            <p class="body-1">
              <v-icon color="primary" left>mdi-email</v-icon>
              contact@yourstore.com
            </p>
            <p class="body-1">
              <v-icon color="primary" left>mdi-map-marker</v-icon>
              1234 E-commerce St., Online City, USA
            </p>
            <v-divider class="my-3"></v-divider>
            <div class="social-icons">
              <v-btn icon color="primary">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </Default>
</template>

<script setup>
import Default from "@/layouts/Default.vue";
import { ref } from "vue";

// Reactive state
const form = ref({
  name: "",
  email: "",
  message: "",
});
const formValid = ref(false);

// Validation rules
const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Enter a valid email",
};

// Methods
const submitForm = () => {
  const formRef = form;
  if (formRef.value.validate()) {
    alert("Message sent successfully!");
    form.value = { name: "", email: "", message: "" };
    formRef.value.resetValidation();
  }
};
</script>

<style scoped>
.contact-page {
  background-color: #f9f9f9;
  padding: 20px;
}
.contact-section {
  margin-top: 40px;
}
.social-icons v-btn {
  margin: 0 5px;
}
</style>

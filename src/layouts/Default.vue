<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
    <v-main>
      <slot name="header">
        <!-- NavBar content here -->
        <NavBar />
      </slot>
      <!-- Main content here -->
      <v-main>
        <slot> </slot>
      </v-main>

        <!-- Footer content here -->
        <slot name="footter">
          <AppFooter />
        </slot>
    </v-main>
</template>
